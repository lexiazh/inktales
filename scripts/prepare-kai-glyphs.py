"""Partition the bundled Kai glyph into ordered, complete stroke slices.

Optional regeneration requires fonttools, brotli and shapely. Every slice is a
Voronoi cell clipped by the original glyph in the browser. Its full width appears
at once, so no thin guide path needs to fill missing edges afterward.
"""
import json
import math
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.svgLib.path import parse_path
from shapely import voronoi_polygons
from shapely.geometry import LineString, MultiPoint, Point, box
from shapely.ops import nearest_points, unary_union
from shapely.strtree import STRtree

ROOT = Path(__file__).resolve().parents[1]
font = TTFont(ROOT / 'public/assets/inktales-kai.woff2')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
baseline = (font['head'].unitsPerEm - font['hhea'].ascent + font['hhea'].descent) / 2 + font['hhea'].ascent


def region_path(geometry):
    polygons = [geometry] if geometry.geom_type == 'Polygon' else list(geometry.geoms)
    paths = []
    for polygon in polygons:
        for ring in [polygon.exterior, *polygon.interiors]:
            coordinates = list(ring.coords)
            paths.append('M' + 'L'.join(f'{x:.3f} {y:.3f}' for x, y in coordinates[:-1]) + 'Z')
    return ''.join(paths)


result = {}
for char in '山水日月木林火人大小口田':
    data = json.loads((ROOT / f'public/data/{char}.json').read_text())
    glyph = glyphs[cmap[ord(char)]]
    pen = SVGPathPen(glyphs)
    glyph.draw(pen)
    bounds_pen = BoundsPen(glyphs)
    glyph.draw(bounds_pen)
    left, bottom, right, top = bounds_pen.bounds
    source_pen = BoundsPen(None)
    for path in data['strokes']:
        parse_path(path, source_pen)
    sl, sb, sr, st = source_pen.bounds
    medians = [[[round(left + (x - sl) / (sr - sl) * (right - left), 3),
                 round(bottom + (y - sb) / (st - sb) * (top - bottom), 3)]
                for x, y in stroke] for stroke in data['medians']]
    seeds = {}
    bin_counts = []
    for index, points in enumerate(medians):
        lengths = [math.dist(start, end) for start, end in zip(points, points[1:])]
        total_length = sum(lengths)
        bin_count = min(36, max(8, math.ceil(total_length / 5)))
        bin_counts.append(bin_count)
        traveled = 0
        for (start, end), length in zip(zip(points, points[1:]), lengths):
            steps = max(1, math.ceil(length / 4))
            for step in range(steps + 1):
                t = step / steps
                point = (round(start[0] + (end[0] - start[0]) * t, 3),
                         round(start[1] + (end[1] - start[1]) * t, 3))
                bin_index = min(bin_count - 1, int((traveled + t * length) / total_length * bin_count))
                seeds.setdefault(point, (index, bin_index))
            traveled += length
    seed_points = [Point(point) for point in seeds]
    labels = list(seeds.values())
    tree = STRtree(seed_points)
    cells = voronoi_polygons(MultiPoint(seed_points), extend_to=box(-500, -500, 1500, 1500))
    if not unary_union(cells.geoms).covers(box(left, bottom, right, top)):
        raise ValueError(f'{char}: stroke slices do not cover the font outline')
    pieces = [{} for _ in medians]
    for cell in cells.geoms:
        matches = tree.query(cell, predicate='covers')
        if len(matches) != 1:
            raise ValueError(f'{char}: invalid stroke partition')
        stroke, bin_index = labels[matches[0]]
        pieces[stroke].setdefault(bin_index, []).append(cell)

    # A crossing belongs to both strokes. Let the stroke currently being drawn
    # paint through the other stroke instead of leaving a green gap at the join.
    lines = [LineString(points) for points in medians]
    for first in range(len(lines)):
        for second in range(first):
            a, b = lines[first], lines[second]
            if a.distance(b) > 55:
                continue
            near_a, near_b = nearest_points(a, b)
            bridge = a.buffer(110).intersection(b.buffer(110))
            for stroke, line, near in ((first, a, near_a), (second, b, near_b)):
                bin_index = max(0, min(bin_counts[stroke] - 1,
                                       int(line.project(near) / line.length * bin_counts[stroke]) - 1))
                pieces[stroke].setdefault(bin_index, []).append(bridge)
    result[char] = {'outline': pen.getCommands(), 'baseline': baseline,
                    'pieces': [[region_path(unary_union(cells)) for _, cells in sorted(stroke.items())]
                               for stroke in pieces]}

(ROOT / 'lib/kai-glyphs.json').write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'Prepared {len(result)} regular-script characters from the existing font')

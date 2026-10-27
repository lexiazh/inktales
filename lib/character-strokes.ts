import glyphs from './kai-glyphs.json';

export type CharacterGlyph={outline:string;baseline:number;pieces:string[][]};

// Generated from the same bundled Kai font used by the character library.
export const characterGlyphs:Record<string,CharacterGlyph>=glyphs;

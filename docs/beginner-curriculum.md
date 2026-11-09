# Beginner curriculum expansion

The course contains 250 single-character cards in five categories of 50. The original twelve IDs, stories and bundled historical forms are preserved. New IDs use the Unicode code point so saved learning records remain stable.

## Content

New notes teach modern meanings and everyday example words. Pronunciations and examples were authored for the taught sense; difficult readings such as 发 fà, 长 cháng and 只 zhī are explained explicitly. Drafts were AI-assisted, then corrected for word usage and unsupported origin claims. They are teaching copy, not official dictionary translations or expert-certified etymology.

CUHK Multi-function Chinese Character Database entries were consulted where retrievable. Each available URL remains in `storySource` for internal reference; the removed Story source link stays removed. New notes without a retrievable entry make no origin claims. Historical glyphs are not fabricated to fill gaps.

## Artwork

The Characters gallery uses an individually generated watercolor painting per new card. The prompt set is in `character-art-prompts.json`; installed image metadata is recorded in `character-art-manifest.json`. New raster assets are 1100 × 733 WebP files under `public/assets/characters/watercolor`. The original twelve paintings remain unchanged. Gallery images have no baked-in Chinese or pinyin: those are rendered by the existing card layout.

Living Hanzi uses local vector scenes for all 250 characters. Accepted strokes reveal layers of the scene. Finishing the character starts a motion tied to its meaning, such as rainfall for 雨 or rising steam for 煮.

## Categories

- **Nature** — 山水日月木林火田天地土石沙云雨雪风雷电气冰河海江湖泉波浪花草竹叶树根枝森星光空春夏秋冬冷热晴阴阳雾露 (50)
- **People & life** — 人大小口目耳手足头心身牙舌鼻脸眼发毛皮血骨男女子孩父母爸妈兄弟姐妹友朋师生我你他她老好爱笑哭看听说学 (50)
- **Food & Drink** — 米面饭菜茶奶汤肉鱼蛋瓜果豆糖盐油酸甜苦辣香饱饿吃喝煮炒烧烤蒸碗杯盘筷勺刀餐饼鸡鸭牛羊猪虾蟹桃梨苹橙饺 (50)
- **Places & Transport** — 家门窗房屋室厅床桌椅灯书笔纸包衣鞋车马路街桥店市国城村校院站机场船港岛园公工厂楼梯墙走跑来去回开关坐 (50)
- **Numbers & Time** — 一二三四五六七八九十百千万零两半双单多少今明昨年岁时分秒点早晚午夜周期季每次个本张块只第先再长短快慢 (50)

## Loading and compatibility

New stroke files are loaded only for the selected character. Repeated requests share one promise, failed requests can retry, and switching cards does not paint late results into another character. Progress totals are derived from the course length. Existing local-storage keys remain unchanged.

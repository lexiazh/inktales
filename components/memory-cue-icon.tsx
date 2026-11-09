import {
 Apple, Armchair, ArrowDown, ArrowRight, ArrowUp, Backpack, Baby,
 Bean, Bed, Beef, Bird, Bone, BookOpen, Building2, Cake, Calendar, Car,
 Carrot, ChefHat, Circle, Clock, Cloud, CloudFog, CloudRain, CloudSun, Coffee,
 CookingPot, CupSoda, DoorOpen, Droplets, Ear, Egg, Eye, Factory, Fish,
 Flame, Flower2, Footprints, Frown, GlassWater, GraduationCap, Hand, Hash,
 Heart, Home, Lamp, Landmark, Leaf, MapPin, Milk, Mountain, Notebook, PenLine,
 Plane, Repeat, Route, School, Scissors, Ship, Shirt, ShoppingBag, Smile,
 Snowflake, Soup, Sparkles, Sprout, Star, Store, Sun, Timer, Train, Trees,
 Utensils, Users, UserRound, Waves, Wheat, Wind, Zap,
 type LucideIcon,
} from 'lucide-react';

const iconGroups: [LucideIcon, string][] = [
 [CloudSun, '天晴阳'], [Mountain, '石沙岛'], [CloudFog, '云雾阴'],
 [CloudRain, '雨露'], [Snowflake, '雪冰冬冷'], [Wind, '风气'],
 [Zap, '雷电'], [Waves, '河海江湖泉波浪'], [Flower2, '花春园香'],
 [Sprout, '草生'], [Trees, '竹树森村'], [Leaf, '叶枝根秋'],
 [Star, '星'], [Sun, '光夏热'], [Cloud, '空'],

 [Eye, '目眼看'], [Ear, '耳听'], [Hand, '手'], [Footprints, '足走跑鞋'],
 [Heart, '心爱'], [Bone, '骨'], [Droplets, '血油'],
 [Scissors, '发毛'], [Baby, '子孩'], [Users, '父母爸妈兄弟姐妹友朋公'],
 [UserRound, '男女我你他她老'], [GraduationCap, '师学'],
 [Smile, '头脸鼻牙舌好笑'], [Frown, '哭'], [Shirt, '身皮衣'],
 [BookOpen, '说书'],

 [Wheat, '米'], [CookingPot, '面饭煮炒'], [Carrot, '菜'],
 [Coffee, '茶苦'], [Milk, '奶'], [Soup, '汤碗饺'], [Beef, '肉牛羊猪'],
 [Fish, '鱼虾蟹'], [Egg, '蛋'], [Apple, '瓜果桃梨苹橙酸'],
 [Bean, '豆'], [Cake, '糖甜饼'], [ShoppingBag, '盐'],
 [Flame, '辣烧烤'], [Utensils, '饱饿吃筷勺刀餐'],
 [GlassWater, '喝'], [CupSoda, '杯'], [ChefHat, '盘'], [Bird, '鸡鸭'],
 [Home, '家房屋室厅'], [DoorOpen, '门窗开关'], [Bed, '床'],
 [Armchair, '桌椅坐'], [Lamp, '灯'], [PenLine, '笔'],
 [Notebook, '纸'], [Backpack, '包'], [Car, '车马'],
 [Route, '路街桥'], [Store, '店市'], [Landmark, '国城'],
 [School, '校'], [Building2, '院楼梯墙'], [Train, '站'],
 [Plane, '机'], [MapPin, '场'], [Ship, '船港'], [Factory, '工厂'],
 [ArrowRight, '来去'], [Repeat, '回再'],

 [Hash, '百千万'], [Circle, '零单个只'], [Users, '两双'],
 [ArrowDown, '少短'], [ArrowUp, '多长'], [Timer, '快慢秒'],
 [Calendar, '今明昨年岁早晚夜周期季每'],
 [Clock, '时分点午次先第'], [BookOpen, '本张'],
 [MapPin, '块'], [Circle, '半'],
];

export function MemoryCueIcon({char}:{char:string}){
 const count='一二三四五六七八九十'.indexOf(char)+1;
 if(count){
  return <svg className="memory-sketch" viewBox="0 0 78 56" width="49" height="39" fill="none" stroke="currentColor" strokeWidth="1.65" role="img" aria-label={'Visual memory cue for '+char}>
   {Array.from({length:count},(_,index)=><circle key={index} cx={15+(index%5)*12} cy={19+Math.floor(index/5)*17} r="3"/>)}
  </svg>;
 }
 const Icon=iconGroups.find(([,characters])=>characters.includes(char))?.[0]||Sparkles;
 return <Icon className="memory-sketch" size={39} strokeWidth={1.6} role="img" aria-label={'Visual memory cue for '+char}/>;
}

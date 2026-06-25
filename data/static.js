/* =============================================
   Static Mock Data — BDSec / MSE (MNT)
   ============================================= */

const STOCKS = [
  { symbol:'BDS',  name:'БДСec ХК',              mnName:'БДСec ХК',              price:1240.00, change:+15.00,  changePct:+1.22, volume:'1.2M',  sector:'Брокер' },
  { symbol:'KHAN', name:'Хаан Банк',             mnName:'Хаан Банк',             price:3850.00, change:-42.00,  changePct:-1.08, volume:'890K',  sector:'Банк' },
  { symbol:'APU',  name:'АПУ ХК',                mnName:'АПУ ХК',                price:612.50,  change:+8.50,   changePct:+1.41, volume:'2.1M',  sector:'Хүнс' },
  { symbol:'MSM',  name:'Мон-Салбар Монгол',     mnName:'Мон-Салбар Монгол',     price:298.00,  change:+3.00,   changePct:+1.02, volume:'450K',  sector:'Барилга' },
  { symbol:'TDB',  name:'Худалдаа Хөгжлийн Банк', mnName:'Худалдаа Хөгжлийн Банк', price:1420.00, change:+22.00,  changePct:+1.57, volume:'620K',  sector:'Банк' },
  { symbol:'SBN',  name:'Соробил ХК',            mnName:'Соробил ХК',            price:890.00,  change:-12.00,  changePct:-1.33, volume:'310K',  sector:'Үйлчилгээ' },
  { symbol:'MNDL', name:'Монгол Даатгал',        mnName:'Монгол Даатгал',        price:1560.00, change:+5.00,   changePct:+0.32, volume:'180K',  sector:'Даатгал' },
  { symbol:'GOLO', name:'Голомт Банк',           mnName:'Голомт Банк',           price:2180.00, change:+18.00,  changePct:+0.83, volume:'540K',  sector:'Банк' },
];

const PORTFOLIO = [
  { symbol:'BDS',  shares:200, avgCost:980.00,  currentPrice:1240.00 },
  { symbol:'KHAN', shares:50,  avgCost:3600.00, currentPrice:3850.00 },
  { symbol:'APU',  shares:300, avgCost:580.00,  currentPrice:612.50 },
  { symbol:'TDB',  shares:80,  avgCost:1280.00, currentPrice:1420.00 },
  { symbol:'MSM',  shares:150, avgCost:275.00,  currentPrice:298.00 },
];

const ORDERS = [
  { id:'ORD-001', symbol:'BDS',  type:'BUY',  qty:50,  price:1220.00, status:'FILLED',    date:'2026-06-05 09:32', cumQty:50 },
  { id:'ORD-002', symbol:'KHAN', type:'SELL', qty:10,  price:3900.00, status:'FILLED',    date:'2026-06-05 10:15', cumQty:10 },
  { id:'ORD-003', symbol:'APU',  type:'BUY',  qty:100, price:605.00,  status:'PENDING',   date:'2026-06-06 08:45', cumQty:0 },
  { id:'ORD-004', symbol:'TDB',  type:'BUY',  qty:20,  price:1410.00, status:'CANCELLED', date:'2026-06-04 14:20', cumQty:0 },
  { id:'ORD-005', symbol:'BDS',  type:'SELL', qty:30,  price:1250.00, status:'FILLED',    date:'2026-06-03 11:05', cumQty:30 },
  { id:'ORD-006', symbol:'MSM',  type:'BUY',  qty:80,  price:295.00,  status:'PENDING',   date:'2026-06-06 09:10', cumQty:0 },
  { id:'ORD-007', symbol:'BDS',  type:'BUY',  qty:100, price:1235.00, status:'PARTIAL',   date:'2026-06-06 11:20', cumQty:60 },
  { id:'ORD-008', symbol:'BDS',  type:'SELL', qty:25,  price:1245.00, status:'PENDING',   date:'2026-06-06 12:05', cumQty:0 },
];

const EXECUTED_TRADES = [
  { qty:100,  price:1238.00, time:'10:32:15' },
  { qty:250,  price:1239.50, time:'10:31:48' },
  { qty:50,   price:1237.00, time:'10:30:12' },
  { qty:1200, price:1240.00, time:'10:28:55' },
  { qty:75,   price:1238.50, time:'10:27:30' },
  { qty:300,  price:1241.00, time:'10:25:04' },
  { qty:18,   price:1236.00, time:'10:22:41' },
  { qty:640,  price:1239.00, time:'10:20:17' },
];

const ORDER_BOOK = {
  buy: [
    { price:1237.00, quantity:6519 }, { price:1237.00, quantity:10 }, { price:1237.00, quantity:36 },
    { price:1237.00, quantity:28 }, { price:1237.00, quantity:254 }, { price:1237.00, quantity:4 },
    { price:1237.00, quantity:5 }, { price:1237.00, quantity:126 }, { price:1236.00, quantity:100 },
    { price:1236.00, quantity:10 },
  ],
  sell: [
    { price:1240.00, quantity:31306 }, { price:1240.00, quantity:50 }, { price:1240.00, quantity:750 },
    { price:1240.00, quantity:1000 }, { price:1240.00, quantity:9 }, { price:1241.00, quantity:50 },
    { price:1241.00, quantity:317 }, { price:1241.00, quantity:1400 }, { price:1242.00, quantity:34 },
    { price:1242.00, quantity:2 },
  ],
};

const FEE_EQUITY = 1;

const WATCHLIST = [
  { symbol:'BDS',  name:'БДСec ХК',       price:1240.00, change:+15.00,  changePct:+1.22 },
  { symbol:'APU',  name:'АПУ ХК',         price:612.50,  change:+8.50,   changePct:+1.41 },
  { symbol:'TDB',  name:'Худалдаа Хөгжлийн Банк', price:1420.00, change:+22.00, changePct:+1.57 },
  { symbol:'KHAN', name:'Хаан Банк',      price:3850.00, change:-42.00,  changePct:-1.08 },
];

const WALLET = {
  cashBalance:    8_450_000,
  totalInvested:  42_680_000,
  portfolioValue: 51_130_000,
  totalPnL:       8_450_000,
  pnlPct:         19.80,
  accountNo:      '4453728992',
  ipoAccount:     '4453728993',
  bondAccount:    '4453728994',
  csdAccount:     '9995',
  transactions: [
    { id:'TXN-001', type:'DEPOSIT',    amount:5000000,  date:'2026-05-01', note:'Банкны шилжүүлэг' },
    { id:'TXN-002', type:'BUY',        amount:-2480000, date:'2026-05-10', note:'BDS x 200' },
    { id:'TXN-003', type:'SELL',       amount:1175000,  date:'2026-05-22', note:'KHAN x 10' },
    { id:'TXN-004', type:'DEPOSIT',    amount:3000000,  date:'2026-06-01', note:'Банкны шилжүүлэг' },
    { id:'TXN-005', type:'WITHDRAWAL', amount:-1500000, date:'2026-06-03', note:'Мөнгө хүсэх' },
  ],
};

const USER = {
  name: 'Б.Батбаяр',
  initials: 'ББ',
  registerNo: 'УБ99112233',
};

const SPARKLINES = {
  BDS:  [1180, 1195, 1205, 1210, 1220, 1230, 1235, 1240],
  KHAN: [3920, 3900, 3880, 3870, 3860, 3855, 3850, 3850],
  APU:  [598, 600, 602, 605, 608, 610, 611, 612.5],
  MSM:  [290, 291, 292, 294, 295, 296, 297, 298],
  TDB:  [1380, 1390, 1395, 1400, 1405, 1410, 1415, 1420],
  SBN:  [905, 900, 898, 895, 892, 890, 889, 890],
  MNDL: [1540, 1545, 1550, 1552, 1555, 1558, 1559, 1560],
  GOLO: [2140, 2150, 2155, 2160, 2165, 2170, 2175, 2180],
};

const INTRADAY = {
  BDS:  [1210,1205,1200,1198,1202,1208,1215,1220,1225,1230,1232,1235,1238,1240,1239,1237,1238,1240,1241,1240],
  KHAN: [3880,3875,3870,3865,3860,3858,3862,3865,3868,3870,3872,3868,3865,3860,3855,3852,3850,3848,3850,3850],
  APU:  [605,604,603,602,604,606,607,608,609,610,611,610,609,610,611,612,612,613,612,612.5],
  TDB:  [1395,1398,1400,1402,1405,1408,1410,1412,1414,1415,1416,1418,1419,1420,1419,1418,1419,1420,1421,1420],
  MSM:  [294,293,292,293,294,295,296,295,296,297,298,297,296,297,298,297,298,298,298,298],
};

const IPO_LIST = [
  { symbol:'MONC', name:'Монкока ХК', price:850, status:'open', subscribed:72, total:1000000, minQty:10, endDate:'2026-06-15' },
  { symbol:'GRNE', name:'Грин Энержи', price:1200, status:'open', subscribed:45, total:500000, minQty:5, endDate:'2026-06-20' },
  { symbol:'TECH', name:'Тех Монгол', price:650, status:'soon', subscribed:0, total:800000, minQty:10, endDate:'2026-07-01' },
];

const RECHARGE_HISTORY = [
  { id:'RCH-001', amount:5000000,  status:'COMPLETED', date:'2026-06-01 11:20', channel:'QPay' },
  { id:'RCH-002', amount:3000000,  status:'COMPLETED', date:'2026-05-15 09:45', channel:'SocialPay' },
  { id:'RCH-003', amount:1000000,  status:'PENDING',   date:'2026-06-08 14:10', channel:'MonPay' },
];

const WITHDRAWALS = [
  { id:'WDR-001', amount:1500000, status:'COMPLETED', date:'2026-06-03 16:30', bank:'Хаан банк', account:'****4521', type:'NOMINAL' },
  { id:'WDR-002', amount:500000,  status:'PENDING',   date:'2026-06-08 10:15', bank:'Голомт банк', account:'****8890', type:'NOMINAL' },
  { id:'WDR-003', amount:200000,  status:'CANCELLED', date:'2026-05-28 13:00', bank:'Худалдаа хөгжлийн банк', account:'****1122', type:'NOMINAL' },
];

const BANKS = [
  { code:'050000', name:'Хаан банк', short:'Хаан' },
  { code:'150000', name:'Голомт банк', short:'Голомт' },
  { code:'040000', name:'Худалдаа хөгжлийн банк', short:'TDB' },
  { code:'020000', name:'Хас банк', short:'Хас' },
  { code:'190000', name:'Төрийн банк', short:'ТДБ' },
];

const BONDS = [
  { symbol:'MNTB-1', name:'Монголын 1 жилийн бонд', issuer:'Монгол Улс', coupon:12.5, maturity:'2027-03-15', nominal:1000000, category:'I' },
  { symbol:'KHAN-BD', name:'Хаан банкны бонд', issuer:'Хаан банк', coupon:14.2, maturity:'2028-06-01', nominal:1000000, category:'II' },
  { symbol:'TDB-BD', name:'TDB бонд 2029', issuer:'TDB', coupon:13.8, maturity:'2029-01-20', nominal:1000000, category:'II' },
  { symbol:'GOLO-BD', name:'Голомт банкны бонд', issuer:'Голомт банк', coupon:15.0, maturity:'2026-12-10', nominal:1000000, category:'III' },
  { symbol:'APU-BD', name:'АПУ корп бонд', issuer:'АПУ ХК', coupon:16.5, maturity:'2027-09-30', nominal:500000, category:'III' },
];

const FAQ_CATEGORIES = [
  { id:'all', name:'Бүгд' },
  { id:1, name:'Данс нээх' },
  { id:2, name:'Арилжаа' },
  { id:3, name:'Хэтэвч' },
  { id:4, name:'KYC' },
];

const FAQ_ITEMS = [
  { id:1, cat:1, q:'ҮЦТХТ-ны данс хэрхэн нээх вэ?', a:'BDSec апп эсвэл вэб системээр бүртгүүлж, хувийн мэдээлэл, банкны данс, гэрээ, төлбөр зэрэг алхмуудыг дагаж дансаа нээнэ.' },
  { id:2, cat:1, q:'Данс нээх хураамж хэд вэ?', a:'Одоогийн байдлаар данс нээх нэг удаагийн хураамж 5,000₮ байна.' },
  { id:3, cat:2, q:'Хоёрдогч зах зээлийн арилжааны цаг?', a:'Даваа–Баасан 10:00–17:00 цагийн хооронд арилжаа хийгдэнэ.' },
  { id:4, cat:2, q:'Захиалга цуцлах боломжтой юу?', a:'Идэвхтэй захиалгыг арилжааны цагийн дотор цуцлах боломжтой.' },
  { id:5, cat:3, q:'Данс хэрхэн цэнэглэх вэ?', a:'QPay, SocialPay, MonPay зэрэг төлбөрийн системээр номинал данс руу мөнгө шилжүүлж болно.' },
  { id:6, cat:3, q:'Мөнгө хүсэх хэдэн хоногт биелэх вэ?', a:'Ихэнхдээ 1–3 ажлын өдрийн дотор банкны данс руу шилжинэ.' },
  { id:7, cat:4, q:'KYC яагаад шаардлагатай вэ?', a:'Хоёрдогч зах зээлд арилжаа хийх эрх авахын тулд хувийн мэдээлэл баталгаажуулах шаардлагатай.' },
  { id:8, cat:4, q:'KYC хяналт хэр удаан үргэлжлэх вэ?', a:'Ихэнх тохиолдолд 1–3 ажлын өдрийн дотор шийдвэрлэгдэнэ.' },
];

const PRICE_ALERTS = [
  { id:'AL-001', symbol:'BDS',  priceType:'CLOSING_PRICE', condition:'ABOVE', targetValue:1300, isActive:true,  lastTriggered:null },
  { id:'AL-002', symbol:'KHAN', priceType:'CLOSING_PRICE', condition:'BELOW', targetValue:3800, isActive:true,  lastTriggered:'2026-06-08 11:30' },
  { id:'AL-003', symbol:'APU',  priceType:'CLOSING_PRICE', condition:'ABOVE', targetValue:620,  isActive:false, lastTriggered:null },
];

const NOTIFICATIONS = [
  { id:'N-001', type:'alert',   title:'Үнийн мэдэгдэл', body:'KHAN хаалтын үнэ 3,800₮-с доош унасан', date:'2026-06-08 11:30', read:false },
  { id:'N-002', type:'order',   title:'Захиалга биелсэн', body:'BDS 50 ш × 1,220₮ биеллээ', date:'2026-06-05 09:35', read:true },
  { id:'N-003', type:'system',  title:'Зах зээл нээгдлээ', body:'Өнөөдрийн арилжаа 10:00-аас эхэлнэ', date:'2026-06-09 09:55', read:false },
  { id:'N-004', type:'account', title:'Цэнэглэлт амжилттай', body:'3,000,000₮ дансанд орлоо', date:'2026-06-01 11:22', read:true },
];

const PROFILE = {
  email: 'batbayar@example.com',
  phone: '+976 9911-2233',
  registerNo: 'УБ99112233',
  nationality: 'Монгол',
  accountOpened: false,
  kycStatus: 'none',
  feePaid: false,
};

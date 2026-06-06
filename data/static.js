/* =============================================
   Static Mock Data — shared across all pages
   ============================================= */

const STOCKS = [
  { symbol:'AAPL',  name:'Apple Inc.',            price:189.84, change:+1.23, changePct:+0.65, volume:'48.2M', mktCap:'2.94T', sector:'Technology' },
  { symbol:'TSLA',  name:'Tesla Inc.',             price:248.42, change:-3.17, changePct:-1.26, volume:'92.1M', mktCap:'790B',  sector:'Automotive' },
  { symbol:'MSFT',  name:'Microsoft Corp.',        price:415.30, change:+2.55, changePct:+0.62, volume:'21.4M', mktCap:'3.08T', sector:'Technology' },
  { symbol:'GOOGL', name:'Alphabet Inc.',          price:172.63, change:+0.88, changePct:+0.51, volume:'24.8M', mktCap:'2.14T', sector:'Technology' },
  { symbol:'AMZN',  name:'Amazon.com Inc.',        price:191.05, change:-1.44, changePct:-0.75, volume:'38.7M', mktCap:'2.00T', sector:'E-Commerce' },
  { symbol:'NVDA',  name:'NVIDIA Corp.',           price:875.40, change:+15.20,changePct:+1.77, volume:'41.3M', mktCap:'2.15T', sector:'Technology' },
  { symbol:'META',  name:'Meta Platforms Inc.',    price:488.17, change:+3.92, changePct:+0.81, volume:'14.6M', mktCap:'1.24T', sector:'Technology' },
  { symbol:'BRK.B', name:'Berkshire Hathaway B',  price:392.10, change:-0.50, changePct:-0.13, volume:'3.2M',  mktCap:'855B',  sector:'Finance' },
  { symbol:'JPM',   name:'JPMorgan Chase & Co.',  price:196.44, change:+1.08, changePct:+0.55, volume:'9.8M',  mktCap:'567B',  sector:'Finance' },
  { symbol:'V',     name:'Visa Inc.',              price:271.55, change:+0.74, changePct:+0.27, volume:'6.3M',  mktCap:'556B',  sector:'Finance' },
];

const PORTFOLIO = [
  { symbol:'AAPL',  shares:50,  avgCost:152.30, currentPrice:189.84 },
  { symbol:'MSFT',  shares:20,  avgCost:310.00, currentPrice:415.30 },
  { symbol:'NVDA',  shares:10,  avgCost:450.00, currentPrice:875.40 },
  { symbol:'TSLA',  shares:30,  avgCost:220.00, currentPrice:248.42 },
  { symbol:'GOOGL', shares:15,  avgCost:140.00, currentPrice:172.63 },
];

const ORDERS = [
  { id:'ORD-001', symbol:'AAPL',  type:'BUY',  qty:10, price:188.00, status:'FILLED',   date:'2026-06-05 09:32' },
  { id:'ORD-002', symbol:'TSLA',  type:'SELL', qty:5,  price:250.00, status:'FILLED',   date:'2026-06-05 10:15' },
  { id:'ORD-003', symbol:'NVDA',  type:'BUY',  qty:2,  price:870.00, status:'PENDING',  date:'2026-06-06 08:45' },
  { id:'ORD-004', symbol:'META',  type:'BUY',  qty:8,  price:485.00, status:'CANCELLED',date:'2026-06-04 14:20' },
  { id:'ORD-005', symbol:'JPM',   type:'SELL', qty:15, price:195.00, status:'FILLED',   date:'2026-06-03 11:05' },
  { id:'ORD-006', symbol:'MSFT',  type:'BUY',  qty:5,  price:412.00, status:'PENDING',  date:'2026-06-06 09:10' },
];

const WATCHLIST = [
  { symbol:'AAPL',  name:'Apple Inc.',         price:189.84, change:+1.23, changePct:+0.65 },
  { symbol:'NVDA',  name:'NVIDIA Corp.',        price:875.40, change:+15.20,changePct:+1.77 },
  { symbol:'AMZN',  name:'Amazon.com Inc.',     price:191.05, change:-1.44, changePct:-0.75 },
  { symbol:'MSFT',  name:'Microsoft Corp.',     price:415.30, change:+2.55, changePct:+0.62 },
];

const WALLET = {
  cashBalance:    24_850.00,
  totalInvested:  87_340.00,
  portfolioValue: 112_680.00,
  totalPnL:       25_340.00,
  pnlPct:         29.01,
  transactions: [
    { id:'TXN-001', type:'DEPOSIT',    amount:10000, date:'2026-05-01', note:'Bank transfer' },
    { id:'TXN-002', type:'BUY',        amount:-7600, date:'2026-05-10', note:'AAPL x 50' },
    { id:'TXN-003', type:'SELL',       amount:3750,  date:'2026-05-22', note:'TSLA x 15' },
    { id:'TXN-004', type:'DEPOSIT',    amount:5000,  date:'2026-06-01', note:'Bank transfer' },
    { id:'TXN-005', type:'WITHDRAWAL', amount:-2000, date:'2026-06-03', note:'To bank' },
  ],
};

// Chart sparkline data (7-day price points for each stock)
const SPARKLINES = {
  AAPL:  [184, 186, 183, 188, 187, 190, 189.84],
  TSLA:  [255, 252, 258, 250, 246, 251, 248.42],
  MSFT:  [408, 410, 412, 409, 414, 413, 415.30],
  NVDA:  [840, 852, 848, 861, 858, 870, 875.40],
  GOOGL: [170, 171, 169, 173, 172, 171, 172.63],
};

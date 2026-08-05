export interface Position {
  symbol: string;
  company: string;
  shares: number;
  avgCost: number;
  marketValue: number;
  changePercent: number;
}

export interface WatchlistItem {
  symbol: string;
  price: number;
  changePercent: number;
  volume: string;
}

export interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

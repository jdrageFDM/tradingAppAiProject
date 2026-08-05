import { Position, WatchlistItem, MarketMover } from '../types';

async function safeFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Backend unavailable: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPortfolio(): Promise<Position[]> {
  return safeFetch<Position[]>('/api/portfolio');
}

export async function fetchWatchlist(): Promise<WatchlistItem[]> {
  return safeFetch<WatchlistItem[]>('/api/watchlist');
}

export async function fetchMarketMovers(): Promise<MarketMover[]> {
  return safeFetch<MarketMover[]>('/api/market/movers');
}

export async function submitOrder(order: {
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  orderType: 'market' | 'limit';
  limitPrice?: number;
}) {
  const response = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return response.ok ? response.json() : Promise.reject(new Error('Order failed'));
}

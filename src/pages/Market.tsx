import { useEffect, useState } from 'react';
import { MarketMover, WatchlistItem } from '../types';
import { fetchMarketMovers, fetchWatchlist } from '../services/tradingApi';
import ErrorBanner from '../components/ErrorBanner';

function Market() {
  const [movers, setMovers] = useState<MarketMover[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchMarketMovers(), fetchWatchlist()])
      .then(([moversData, watchlistData]) => {
        setMovers(moversData);
        setWatchlist(watchlistData);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to reach the backend');
      });
  }, []);

  return (
    <div className="page-grid">
      {error && <ErrorBanner message={error} />}
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Market overview</p>
            <h2>Live market action</h2>
          </div>
          <button className="secondary-button">Refresh</button>
        </div>
        <div className="market-hero">
          <div>
            <span>US Stocks</span>
            <strong>+1.72%</strong>
          </div>
          <div>
            <span>Nasdaq</span>
            <strong>+1.05%</strong>
          </div>
          <div>
            <span>S&P 500</span>
            <strong>+0.82%</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Top gainers</h2>
          <span className="small-label">Momentum stocks</span>
        </div>
        <div className="table-scroll">
          <table className="data-table full-width">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {(movers.length ? movers : [
                { symbol: 'NVDA', name: 'NVIDIA', price: 1032.5, changePercent: 6.4 },
                { symbol: 'AMD', name: 'Advanced Micro Devices', price: 122.3, changePercent: 5.2 },
                { symbol: 'QLD', name: 'ProShares Ultra QQQ', price: 60.5, changePercent: 4.1 }
              ]).map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className={item.changePercent >= 0 ? 'positive' : 'negative'}>{item.changePercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Watchlist ideas</h2>
          <span className="small-label">Review assets</span>
        </div>
        <ul className="watchlist-grid">
          {(watchlist.length ? watchlist : [
            { symbol: 'NFLX', price: 611.2, changePercent: 1.9, volume: '5.2M' },
            { symbol: 'META', price: 478.9, changePercent: 2.7, volume: '7.1M' },
            { symbol: 'DIS', price: 143.8, changePercent: -0.3, volume: '6.4M' }
          ]).map((item) => (
            <li key={item.symbol}>
              <div>
                <strong>{item.symbol}</strong>
                <span>{item.volume}</span>
              </div>
              <div>
                <strong>${item.price.toFixed(2)}</strong>
                <span className={item.changePercent >= 0 ? 'positive' : 'negative'}>{item.changePercent}%</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Market;

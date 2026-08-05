import { useEffect, useState } from 'react';
import { MarketMover, Position, WatchlistItem } from '../types';
import { fetchMarketMovers, fetchPortfolio, fetchWatchlist } from '../services/tradingApi';
import ErrorBanner from '../components/ErrorBanner';

function metric(label: string, value: string, delta: string, positive = true) {
  return (
    <div className="metric-card" key={label}>
      <span>{label}</span>
      <strong>{value}</strong>
      <span className={positive ? 'metric-positive' : 'metric-negative'}>{delta}</span>
    </div>
  );
}

function Dashboard() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [movers, setMovers] = useState<MarketMover[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchPortfolio(), fetchWatchlist(), fetchMarketMovers()])
      .then(([portfolioData, watchlistData, moversData]) => {
        setPositions(portfolioData);
        setWatchlist(watchlistData);
        setMovers(moversData);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to reach the backend');
      });
  }, []);

  return (
    <div className="page-grid">
      {error && <ErrorBanner message={error} />}
      <section className="section-card dashboard-hero">
        <div className="section-title">
          <div>
            <p className="small-label">Portfolio snapshot</p>
            <h2>$232,850</h2>
            <p className="text-muted">Today +$4,930 (2.17%)</p>
          </div>
          <button className="primary-button">Deposit funds</button>
        </div>
        <div className="metrics-row">
          {metric('Cash available', '$14,900', '+0.5%', true)}
          {metric('Open orders', '2', '-', true)}
          {metric('Buying power', '$65,100', '+1.1%', true)}
        </div>
      </section>

      <div className="stretch-row">
        <section className="section-card">
          <div className="section-title">
            <h2>Market movers</h2>
            <span className="small-label">Live trends</span>
          </div>
          <div className="table-scroll">
            <table className="data-table">
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
                  { symbol: 'AMZN', name: 'Amazon', price: 187.3, changePercent: 3.2 },
                  { symbol: 'GOOG', name: 'Alphabet', price: 183.7, changePercent: 2.6 }
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
            <h2>Today's watchlist</h2>
            <span className="small-label">Track favorites</span>
          </div>
          <ul className="watchlist-grid">
            {(watchlist.length ? watchlist : [
              { symbol: 'AAPL', price: 178.34, changePercent: 1.6, volume: '12.3M' },
              { symbol: 'MSFT', price: 411.22, changePercent: 0.9, volume: '8.9M' },
              { symbol: 'TSLA', price: 249.79, changePercent: -0.8, volume: '16.0M' }
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

      <section className="section-card">
        <div className="section-title">
          <h2>Positions</h2>
          <span className="small-label">Portfolio allocation</span>
        </div>
        <div className="table-scroll">
          <table className="data-table full-width">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Shares</th>
                <th>Avg cost</th>
                <th>Market value</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {(positions.length ? positions : [
                { symbol: 'AAPL', company: 'Apple Inc.', shares: 120, avgCost: 152.4, marketValue: 21400, changePercent: 4.5 },
                { symbol: 'MSFT', company: 'Microsoft Corp.', shares: 65, avgCost: 296.8, marketValue: 26600, changePercent: 2.1 },
                { symbol: 'TSLA', company: 'Tesla Inc.', shares: 35, avgCost: 232.1, marketValue: 8730, changePercent: -0.8 }
              ]).map((position) => (
                <tr key={position.symbol}>
                  <td>{position.symbol}</td>
                  <td>{position.company}</td>
                  <td>{position.shares}</td>
                  <td>${position.avgCost.toFixed(2)}</td>
                  <td>${position.marketValue.toLocaleString()}</td>
                  <td className={position.changePercent >= 0 ? 'positive' : 'negative'}>{position.changePercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

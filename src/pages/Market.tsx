import { useEffect, useMemo, useState } from 'react';
import { MarketMover, WatchlistItem } from '../types';
import { fetchMarketMovers, fetchWatchlist } from '../services/tradingApi';
import ErrorBanner from '../components/ErrorBanner';

interface MarketCompany extends MarketMover {
  sector: string;
  marketCap: string;
}

const placeholderCompanies: MarketCompany[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 179.34, changePercent: 1.2, sector: 'Technology', marketCap: '2.8T' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 165.22, changePercent: -0.4, sector: 'Finance', marketCap: '0.5T' },
  { symbol: 'PFE', name: 'Pfizer Inc.', price: 46.18, changePercent: 0.8, sector: 'Healthcare', marketCap: '0.26T' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 109.05, changePercent: 0.6, sector: 'Energy', marketCap: '0.45T' },
  { symbol: 'DIS', name: 'Disney', price: 143.80, changePercent: -0.3, sector: 'Consumer', marketCap: '0.28T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 411.22, changePercent: 0.9, sector: 'Technology', marketCap: '3.1T' },
  { symbol: 'V', name: 'Visa Inc.', price: 238.45, changePercent: 0.4, sector: 'Finance', marketCap: '0.55T' },
  { symbol: 'MRK', name: 'Merck & Co.', price: 99.12, changePercent: 0.1, sector: 'Healthcare', marketCap: '0.26T' }
];

function Market() {
  const [movers, setMovers] = useState<MarketMover[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [sortKey, setSortKey] = useState<'symbol' | 'name' | 'sector' | 'price' | 'changePercent' | 'marketCap'>('changePercent');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const handleSort = (key: 'symbol' | 'name' | 'sector' | 'price' | 'changePercent' | 'marketCap') => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection(key === 'name' || key === 'symbol' || key === 'sector' ? 'asc' : 'desc');
  };

  const sortIndicator = (key: 'symbol' | 'name' | 'sector' | 'price' | 'changePercent' | 'marketCap') => {
    if (sortKey !== key) {
      return '';
    }
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

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

  const filteredCompanies = useMemo(() => {
    return placeholderCompanies
      .filter((company) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          company.symbol.toLowerCase().includes(query) ||
          company.name.toLowerCase().includes(query) ||
          company.sector.toLowerCase().includes(query);

        const matchesSector = sectorFilter === 'All' || company.sector === sectorFilter;
        return matchesQuery && matchesSector;
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortKey === 'name') {
          return a.name.localeCompare(b.name) * direction;
        }
        if (sortKey === 'symbol') {
          return a.symbol.localeCompare(b.symbol) * direction;
        }
        if (sortKey === 'sector') {
          return a.sector.localeCompare(b.sector) * direction;
        }
        if (sortKey === 'marketCap') {
          const parseCap = (cap: string) => parseFloat(cap.replace(/[^\d.]/g, ''));
          return (parseCap(a.marketCap) - parseCap(b.marketCap)) * direction;
        }
        return (a[sortKey] - b[sortKey]) * direction;
      });
  }, [searchQuery, sectorFilter, sortKey, sortDirection]);

  return (
    <div className="page-grid">
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Company search</p>
            <h2>Find companies</h2>
          </div>
        </div>

        <div className="search-panel">
          <div className="search-field">
            <label htmlFor="company-search">Search</label>
            <input
              id="company-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search symbol, name, or sector"
            />
          </div>

          <div className="search-field">
            <label htmlFor="sector-filter">Filter sector</label>
            <select
              id="sector-filter"
              value={sectorFilter}
              onChange={(event) => setSectorFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
              <option value="Consumer">Consumer</option>
            </select>
          </div>

        </div>

        <div className="table-scroll">
          <table className="data-table full-width">
            <thead>
              <tr>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('symbol')}>
                    Symbol{sortIndicator('symbol')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('name')}>
                    Name{sortIndicator('name')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('sector')}>
                    Sector{sortIndicator('sector')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('price')}>
                    Price{sortIndicator('price')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('changePercent')}>
                    Change{sortIndicator('changePercent')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('marketCap')}>
                    Market cap{sortIndicator('marketCap')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>{item.sector}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className={item.changePercent >= 0 ? 'positive' : 'negative'}>{item.changePercent}%</td>
                  <td>{item.marketCap}</td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No matching companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

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

import { useMemo, useState } from 'react';
import { Position } from '../types';

const samplePositions: Position[] = [
  { symbol: 'AAPL', company: 'Apple Inc.', shares: 120, avgCost: 152.4, marketValue: 21400, changePercent: 4.5 },
  { symbol: 'MSFT', company: 'Microsoft Corp.', shares: 65, avgCost: 296.8, marketValue: 26600, changePercent: 2.1 },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', shares: 21, avgCost: 124.9, marketValue: 26230, changePercent: 3.7 },
  { symbol: 'TSLA', company: 'Tesla Inc.', shares: 35, avgCost: 232.1, marketValue: 8730, changePercent: -0.8 }
];

function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<'All' | 'Gainers' | 'Losers'>('All');
  const [sortKey, setSortKey] = useState<'symbol' | 'company' | 'shares' | 'avgCost' | 'marketValue' | 'changePercent'>('marketValue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: 'symbol' | 'company' | 'shares' | 'avgCost' | 'marketValue' | 'changePercent') => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection(key === 'symbol' || key === 'company' ? 'asc' : 'desc');
  };

  const sortIndicator = (key: 'symbol' | 'company' | 'shares' | 'avgCost' | 'marketValue' | 'changePercent') => {
    if (sortKey !== key) {
      return '';
    }
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const filteredPositions = useMemo(() => {
    return samplePositions
      .filter((position) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          position.symbol.toLowerCase().includes(query) ||
          position.company.toLowerCase().includes(query);

        const matchesFilter =
          positionFilter === 'All' ||
          (positionFilter === 'Gainers' && position.changePercent >= 0) ||
          (positionFilter === 'Losers' && position.changePercent < 0);

        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortKey === 'symbol') {
          return a.symbol.localeCompare(b.symbol) * direction;
        }
        if (sortKey === 'company') {
          return a.company.localeCompare(b.company) * direction;
        }
        if (sortKey === 'shares') {
          return (a.shares - b.shares) * direction;
        }
        if (sortKey === 'avgCost') {
          return (a.avgCost - b.avgCost) * direction;
        }
        if (sortKey === 'marketValue') {
          return (a.marketValue - b.marketValue) * direction;
        }
        return (a.changePercent - b.changePercent) * direction;
      });
  }, [searchQuery, positionFilter, sortKey, sortDirection]);

  return (
    <div className="page-grid">
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Your portfolio</p>
            <h2>$84,960</h2>
          </div>
          <button className="secondary-button">Analyze risk</button>
        </div>
        <div className="allocation-row">
          <div className="allocation-card">
            <span>Equity</span>
            <strong>72%</strong>
          </div>
          <div className="allocation-card">
            <span>Cash</span>
            <strong>18%</strong>
          </div>
          <div className="allocation-card">
            <span>Options</span>
            <strong>10%</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Positions</p>
            <h2>Holdings and performance</h2>
          </div>
        </div>

        <div className="search-panel">
          <div className="search-field">
            <label htmlFor="position-search">Search positions</label>
            <input
              id="position-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search symbol or company"
            />
          </div>

          <div className="search-field">
            <label htmlFor="position-filter">Filter</label>
            <select
              id="position-filter"
              value={positionFilter}
              onChange={(event) => setPositionFilter(event.target.value as 'All' | 'Gainers' | 'Losers')}
            >
              <option value="All">All positions</option>
              <option value="Gainers">Gainers</option>
              <option value="Losers">Losers</option>
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
                  <button type="button" className="table-sort-button" onClick={() => handleSort('company')}>
                    Company{sortIndicator('company')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('shares')}>
                    Shares{sortIndicator('shares')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('avgCost')}>
                    Avg cost{sortIndicator('avgCost')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('marketValue')}>
                    Market value{sortIndicator('marketValue')}
                  </button>
                </th>
                <th>
                  <button type="button" className="table-sort-button" onClick={() => handleSort('changePercent')}>
                    Change{sortIndicator('changePercent')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.symbol}>
                  <td>{position.symbol}</td>
                  <td>{position.company}</td>
                  <td>{position.shares}</td>
                  <td>${position.avgCost.toFixed(2)}</td>
                  <td>${position.marketValue.toLocaleString()}</td>
                  <td className={position.changePercent >= 0 ? 'positive' : 'negative'}>{position.changePercent}%</td>
                </tr>
              ))}
              {filteredPositions.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No matching positions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Portfolio insights</h2>
          <span className="small-label">Latest account activity</span>
        </div>
        <ul className="activity-log">
          <li>
            <span>Buy</span>
            <p>Purchased 30 shares of AMZN at $124.90</p>
            <strong>Today</strong>
          </li>
          <li>
            <span>Dividend</span>
            <p>Apple dividend received: $48.20</p>
            <strong>2 days ago</strong>
          </li>
          <li>
            <span>Order</span>
            <p>Sell limit order placed for TSLA</p>
            <strong>Yesterday</strong>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Portfolio;

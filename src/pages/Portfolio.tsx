import { Position } from '../types';

const samplePositions: Position[] = [
  { symbol: 'AAPL', company: 'Apple Inc.', shares: 120, avgCost: 152.4, marketValue: 21400, changePercent: 4.5 },
  { symbol: 'MSFT', company: 'Microsoft Corp.', shares: 65, avgCost: 296.8, marketValue: 26600, changePercent: 2.1 },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', shares: 21, avgCost: 124.9, marketValue: 26230, changePercent: 3.7 },
  { symbol: 'TSLA', company: 'Tesla Inc.', shares: 35, avgCost: 232.1, marketValue: 8730, changePercent: -0.8 }
];

function Portfolio() {
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
          <h2>Positions</h2>
          <span className="small-label">Holdings and performance</span>
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
              {samplePositions.map((position) => (
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

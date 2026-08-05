import { FormEvent, useMemo, useState } from 'react';

function Trade() {
  const [symbol, setSymbol] = useState('AAPL');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState(0);
  const [status, setStatus] = useState('Ready to submit your order');

  const orderTotal = useMemo(() => {
    const price = orderType === 'market' ? 178.34 : limitPrice || 0;
    return (price * quantity).toFixed(2);
  }, [quantity, orderType, limitPrice]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(`Order submitted: ${side.toUpperCase()} ${quantity} ${symbol}`);
  };

  return (
    <div className="page-grid">
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Trade execution</p>
            <h2>Quick trade</h2>
          </div>
          <span className="small-label">Market hours</span>
        </div>

        <form className="trade-form" onSubmit={handleSubmit}>
          <label>
            Symbol
            <input value={symbol} onChange={(event) => setSymbol(event.target.value.toUpperCase())} />
          </label>
          <label>
            Action
            <select value={side} onChange={(event) => setSide(event.target.value as 'buy' | 'sell')}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          <label>
            Order type
            <select value={orderType} onChange={(event) => setOrderType(event.target.value as 'market' | 'limit')}>
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
          </label>
          {orderType === 'limit' && (
            <label>
              Limit price
              <input
                type="number"
                min={0}
                value={limitPrice}
                onChange={(event) => setLimitPrice(Number(event.target.value))}
              />
            </label>
          )}

          <div className="trade-footer">
            <div>
              <p className="small-label">Estimated order total</p>
              <strong>${orderTotal}</strong>
            </div>
            <button type="submit" className="primary-button">
              Submit {side}
            </button>
          </div>
        </form>

        <div className="status-box">
          <p>{status}</p>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Order preview</h2>
          <span className="small-label">Track order details</span>
        </div>
        <div className="preview-grid">
          <div>
            <span>Symbol</span>
            <strong>{symbol}</strong>
          </div>
          <div>
            <span>Side</span>
            <strong>{side.toUpperCase()}</strong>
          </div>
          <div>
            <span>Quantity</span>
            <strong>{quantity}</strong>
          </div>
          <div>
            <span>Order type</span>
            <strong>{orderType}</strong>
          </div>
          {orderType === 'limit' && (
            <div>
              <span>Limit price</span>
              <strong>${limitPrice.toFixed(2)}</strong>
            </div>
          )}
          <div>
            <span>Estimated cost</span>
            <strong>${orderTotal}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trade;

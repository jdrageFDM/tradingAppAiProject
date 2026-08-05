function Account() {
  return (
    <div className="page-grid">
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Account summary</p>
            <h2>Account settings</h2>
          </div>
          <button className="secondary-button">Manage API</button>
        </div>

        <div className="account-grid">
          <div className="profile-card">
            <span>Profile</span>
            <p>Jordan Reeves</p>
            <small>Trader · Expert</small>
          </div>
          <div className="account-card">
            <span>Plan</span>
            <strong>Pro</strong>
            <p>Real-time quotes, fast order entry, priority support.</p>
          </div>
          <div className="account-card">
            <span>Security</span>
            <strong>2FA enabled</strong>
            <p>Secure login and account protection.</p>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Billing details</h2>
          <span className="small-label">Subscription summary</span>
        </div>
        <div className="billing-row">
          <div>
            <span>Next invoice</span>
            <strong>Aug 21, 2026</strong>
          </div>
          <div>
            <span>Monthly fee</span>
            <strong>$49</strong>
          </div>
          <div>
            <span>Last payment</span>
            <strong>$49</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Security center</h2>
          <span className="small-label">Protect your account</span>
        </div>
        <ul className="security-list">
          <li>
            <strong>Two-factor authentication</strong>
            <p>Enabled for all logins and withdrawals.</p>
          </li>
          <li>
            <strong>Authorized devices</strong>
            <p>Review and remove devices anytime.</p>
          </li>
          <li>
            <strong>Recent logins</strong>
            <p>Last login from New York, NY.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Account;

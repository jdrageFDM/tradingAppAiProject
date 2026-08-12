import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-trading-preferences';

function Preferences() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const p = JSON.parse(stored);
        setEmailNotifications(!!p.emailNotifications);
        setPushNotifications(!!p.pushNotifications);
        setMarketingEmails(!!p.marketingEmails);
        setTheme(p.theme ?? 'auto');
      } catch {}
    }
  }, []);

  const handleSave = () => {
    const prefs = { emailNotifications, pushNotifications, marketingEmails, theme };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-grid">
      <section className="section-card">
        <div className="section-title">
          <div>
            <p className="small-label">Preferences</p>
            <h2>Account preferences</h2>
          </div>
        </div>

        <div className="preferences-form">
          <label className="toggle-row">
            <div>
              <strong>Email notifications</strong>
              <div className="small-label">Receive updates about account activity</div>
            </div>
            <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
          </label>

          <label className="toggle-row">
            <div>
              <strong>Push notifications</strong>
              <div className="small-label">Send push notifications to your devices</div>
            </div>
            <input type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} />
          </label>

          <label className="toggle-row">
            <div>
              <strong>Marketing emails</strong>
              <div className="small-label">Receive promotional and marketing emails</div>
            </div>
            <input type="checkbox" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
          </label>

          <label>
            Theme
            <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <div className="form-actions">
            <button className="primary-button" onClick={handleSave}>Save preferences</button>
            {saved && <span className="small-label">Saved</span>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Preferences;

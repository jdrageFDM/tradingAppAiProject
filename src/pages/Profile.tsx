import { useState, ChangeEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import ErrorBanner from '../components/ErrorBanner';

function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [username, setUsername] = useState(user?.username ?? (user?.email.split('@')[0] ?? ''));
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleSave = () => {
    setError(null);
    setSuccess(null);
    try {
      const updated = updateUser?.({ name, username, avatarUrl: avatarPreview ?? undefined });
      if (updated) setSuccess('Profile saved');
      else setError('No authenticated user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    }
  };

  return (
    <div className="page-grid">
      {error && <ErrorBanner message={error} />}
      {success && <div className="success-banner">{success}</div>}

      <section className="section-card profile-section">
        <div className="section-title">
          <div>
            <p className="small-label">Profile</p>
            <h2>Edit profile</h2>
          </div>
        </div>

        <div className="profile-form">
          <label>
            Display name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label>
            Email
            <input value={user?.email ?? ''} readOnly />
          </label>

          <label>
            Profile picture
            <div className="avatar-upload">
              <div className="avatar-preview">
                {avatarPreview ? <img src={avatarPreview} alt="avatar" /> : <div className="avatar-placeholder">{(user?.name || '?').charAt(0)}</div>}
              </div>
              <input type="file" accept="image/*" onChange={onFileChange} />
            </div>
          </label>

          <div className="form-actions">
            <button className="secondary-button" onClick={() => { setName(user?.name ?? ''); setUsername(user?.username ?? ''); setAvatarPreview(user?.avatarUrl ?? null); }}>
              Reset
            </button>
            <button className="primary-button" onClick={handleSave}>Save profile</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;

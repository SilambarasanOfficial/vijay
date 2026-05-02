import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if backend is reachable
  useEffect(() => {
    const check = async () => {
      try {
        await api.get('/profile', { timeout: 3000 });
        setServerStatus('online');
      } catch (err) {
        // Network error = offline; any HTTP response = online (even 401)
        setServerStatus(err.response ? 'online' : 'offline');
      }
    };
    check();
  }, []);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (serverStatus === 'offline') {
      toast.error('Backend server is not running. Start it with: npm run dev');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token);
      toast.success('Welcome back, Vijay!');
      navigate('/admin');
    } catch (err) {
      if (!err.response) {
        // Network error — backend went down between check and submit
        setServerStatus('offline');
        toast.error('Cannot reach the server. Is the backend running on port 5000?');
      } else if (err.response.status === 401) {
        toast.error('Wrong username or password');
      } else {
        toast.error(err.response?.data?.message || 'Login failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-serif text-6xl gold-gradient font-bold leading-none">VJ</div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-gray-600 mt-2">Admin Panel</div>
        </div>

        {/* Server status badge */}
        <div className="flex justify-center mb-6">
          {serverStatus === 'checking' && (
            <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-600 border border-white/10 px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
              Checking server...
            </span>
          )}
          {serverStatus === 'online' && (
            <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-emerald-500 border border-emerald-900/40 bg-emerald-900/10 px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Server online
            </span>
          )}
          {serverStatus === 'offline' && (
            <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-red-400 border border-red-900/40 bg-red-900/10 px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Server offline
            </span>
          )}
        </div>

        {/* Offline warning */}
        {serverStatus === 'offline' && (
          <div className="bg-red-900/10 border border-red-900/30 p-4 mb-6 text-xs text-red-400 leading-relaxed">
            <p className="font-semibold mb-2">⚠ Backend server is not running</p>
            <p className="text-red-500 mb-3">Open a terminal and run:</p>
            <code className="block bg-black/40 px-3 py-2 text-emerald-400 tracking-wide">
              cd vijay/backend &amp;&amp; npm run dev
            </code>
            <p className="mt-3 text-red-500">Then refresh this page.</p>
          </div>
        )}

        <div className="bg-dark-3 border border-white/8 p-8">
          <h2 className="font-serif text-2xl text-white mb-1">Sign In</h2>
          <p className="text-gray-600 text-xs mb-8 tracking-wide">
            Enter your admin credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="admin-label">Username</label>
              <input
                type="text"
                required
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                className="input-field bg-dark"
                placeholder="admin"
                disabled={serverStatus === 'offline'}
              />
            </div>
            <div>
              <label className="admin-label">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="input-field bg-dark"
                placeholder="••••••••"
                disabled={serverStatus === 'offline'}
              />
            </div>

            <button
              type="submit"
              disabled={loading || serverStatus !== 'online'}
              className="btn-gold w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Default credentials hint */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] text-gray-700 tracking-widest text-center uppercase mb-2">
              Default credentials
            </p>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-dark border border-white/5 px-3 py-2">
                <div className="text-[9px] text-gray-700 uppercase tracking-widest mb-1">Username</div>
                <div className="text-gray-400 text-xs font-mono">admin</div>
              </div>
              <div className="bg-dark border border-white/5 px-3 py-2">
                <div className="text-[9px] text-gray-700 uppercase tracking-widest mb-1">Password</div>
                <div className="text-gray-400 text-xs font-mono">vjphoto@2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-700 hover:text-gray-500 text-xs tracking-widest transition-colors"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}

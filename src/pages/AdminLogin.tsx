import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 relative">
      <Link to="/" className="absolute top-8 left-8 p-3 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </Link>
      
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl mb-2 tracking-wide text-white">Innovaeste</h1>
          <p className="text-accent-orange text-sm tracking-[0.2em] uppercase font-semibold">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Work Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-orange transition-all"
              placeholder="admin@innovaeste.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">System Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-orange transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-accent-orange hover:bg-orange-500 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all mt-4"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-slate-500">
          Secure connection established to Mainframe 01.
        </div>
      </div>
    </div>
  );
}

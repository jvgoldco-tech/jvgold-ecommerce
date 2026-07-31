import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'jp2024') {
      navigate('/admin/inventory');
    } else {
      setError('Invalid credentials. Hint: use jp2024');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-xs tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center space-x-2"
      >
        <span>←</span> <span>BACK</span>
      </button>

      <div className="w-full max-w-md text-center mb-12">
        <h1 className="font-display text-4xl mb-4 tracking-widest">JEWELRY PRIME</h1>
        <div className="w-12 h-[1px] bg-accent mx-auto mb-4"></div>
        <span className="text-xs tracking-[0.2em] text-primary/40 uppercase">Administration Panel</span>
      </div>

      <div className="bg-white border border-black/5 p-8 w-full max-w-md shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#f9f9f9] border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-[#f9f9f9] border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2 font-serif italic">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white text-xs tracking-widest py-4 hover:bg-black transition-colors uppercase font-medium"
          >
            Sign In
          </button>
          
          <p className="text-center text-primary/40 text-[10px] italic font-serif">Demo: password is "jp2024"</p>
        </form>
      </div>
    </div>
  );
};

export default Login;

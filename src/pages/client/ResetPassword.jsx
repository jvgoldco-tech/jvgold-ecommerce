import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import { useStore } from '../../store/useStore';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const brandConfig = useStore(state => state.siteConfig.brand);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Enlace inválido o incompleto.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (newPassword.length < 12) {
      setError('La contraseña debe tener al menos 12 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      setSuccess(response.data.message || 'Contraseña actualizada exitosamente.');
      setTimeout(() => navigate('/admin/login'), 4000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al restablecer contraseña.');
      } else {
        setError('Error de conexión al servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative">
      <div className="w-full max-w-md text-center mb-8 flex flex-col items-center">
        {(brandConfig.displayMode === 'LOGO' || brandConfig.displayMode === 'BOTH') && brandConfig.logoUrl && (
          <img src={brandConfig.logoUrl} alt="Logo" className="h-12 object-contain mb-4" />
        )}
        {(brandConfig.displayMode === 'TEXT' || brandConfig.displayMode === 'BOTH') && (
          <h1 className="font-display text-4xl mb-4 tracking-widest uppercase text-primary">
            {brandConfig.name}
          </h1>
        )}
        <div className="w-12 h-[1px] bg-accent mx-auto mb-4"></div>
        <span className="text-xs tracking-[0.2em] text-primary/40 uppercase">Nueva Contraseña</span>
      </div>

      <div className="bg-white border border-black/5 p-8 w-full max-w-md shadow-sm">
        {!token ? (
          <div className="text-center space-y-4">
            <p className="text-red-500 text-sm font-serif italic mb-4">Enlace de recuperación inválido o faltante.</p>
            <Link to="/admin/login" className="text-xs tracking-widest text-primary hover:text-accent uppercase">
              Ir al Login
            </Link>
          </div>
        ) : success ? (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-sm font-serif italic mb-4">{success}</div>
            <Link to="/admin/login" className="text-xs tracking-widest text-primary hover:text-accent uppercase">
              Ir al Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Nueva Contraseña (Mín. 12 carac.)</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
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
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Confirmar Contraseña</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                className="w-full bg-[#f9f9f9] border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
              />
            </div>

            {error && <p className="text-red-500 text-xs mt-2 font-serif italic text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white text-xs tracking-widest py-4 hover:bg-black transition-colors uppercase font-medium flex justify-center items-center mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : 'Guardar Contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

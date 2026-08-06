import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Heart, Tag, Grid3X3, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const FabNav = () => {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const favorites = useStore(state => state.favorites);
  const collections = useStore(state => state.catalogs.collections);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Metallic gold gradient used for borders and rings
  const goldGradient = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";
  const iconColor = "text-[#E6C762]";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center">
      
      {/* Upward Popup Menu for Collections */}
      <div 
        className={`mb-4 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 max-h-[400px] translate-y-0' : 'opacity-0 max-h-0 translate-y-4 pointer-events-none'}`}
      >
        <div className="bg-[#1c0f16]/30 backdrop-blur-3xl transform-gpu shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[#BF953F]/40 rounded-3xl p-4 flex flex-col min-w-[200px]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#BF953F]/20">
            <span className="text-white text-xs tracking-[0.2em] uppercase font-medium">Collections</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-white/80 hover:text-[#E6C762] hover:bg-white/5 transition-colors text-sm font-medium"
              >
                MEN
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-white/80 hover:text-[#E6C762] hover:bg-white/5 transition-colors text-sm font-medium border-b border-white/10 mb-2 pb-3"
              >
                WOMEN
              </Link>
            </li>
            {collections.map(c => (
              <li key={c.id}>
                <Link 
                  to={`/category/${c.id}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-white/80 hover:text-[#E6C762] hover:bg-white/5 transition-colors text-sm"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 mt-2 rounded-lg text-[#E6C762] font-medium hover:bg-white/5 transition-colors text-sm border border-[#BF953F]/20 text-center"
              >
                {useStore(state => state.siteConfig.uiTexts.viewCatalog) || 'VIEW CATALOG'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Glass container - highly translucent with heavy blur and a direct gold border */}
      <div className="flex items-center space-x-3 sm:space-x-5 px-4 sm:px-6 py-2 rounded-full bg-[#1c0f16]/30 backdrop-blur-3xl transform-gpu shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[#BF953F]/40">
        
        <button 
          onClick={() => { setIsMenuOpen(false); navigate('/new-arrivals'); }} 
          title="Novedades" 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
        >
          <Sparkles size={16} strokeWidth={1.5} />
        </button>
        
        <button 
          onClick={() => { setIsMenuOpen(false); navigate('/favorites'); }} 
          title="Favoritos" 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
        >
          <Heart size={16} strokeWidth={1.5} className={favorites.length > 0 ? "fill-current" : ""} />
          {favorites.length > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FCF6BA] rounded-full shadow-[0_0_8px_rgba(252,246,186,0.8)]"></span>
          )}
        </button>

        <button 
          onClick={() => { setIsMenuOpen(false); navigate('/promotions'); }} 
          title="Ofertas" 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
        >
          <Tag size={16} strokeWidth={1.5} />
        </button>

        {/* Catalog / Grid - Special central/highlighted button with large textured gold ring */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          title="Colecciones" 
          className={`relative w-10 h-10 rounded-full flex items-center justify-center p-[1px] ${goldGradient} shadow-[0_0_10px_rgba(191,149,63,0.3)] hover:scale-105 transition-transform duration-300 mx-1`}
        >
          <div className="w-full h-full rounded-full bg-[#1c0f16]/40 backdrop-blur-xl transform-gpu flex items-center justify-center border border-black/30 shadow-inner">
            <Grid3X3 size={18} strokeWidth={1.5} className={isMenuOpen ? "text-white" : iconColor} />
          </div>
        </button>

        <button 
          onClick={() => { setIsMenuOpen(false); navigate('/cart'); }} 
          title="Carrito" 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
        >
          <ShoppingBag size={16} strokeWidth={1.5} className={cart.length > 0 ? "fill-current" : ""} />
          {cart.length > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FCF6BA] rounded-full shadow-[0_0_8px_rgba(252,246,186,0.8)]"></span>
          )}
        </button>

      </div>
    </div>
  );
};

export default FabNav;

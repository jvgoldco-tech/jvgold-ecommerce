import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Tag, Grid3X3, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';

const FabNav = () => {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const favorites = useStore(state => state.favorites);
  
  // Metallic gold gradient used for borders and rings
  const goldGradient = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";
  const iconColor = "text-[#E6C762]";

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      {/* Outer wrapper for the metallic border effect */}
      <div className={`pointer-events-auto rounded-[2rem] p-[1px] ${goldGradient} shadow-[0_15px_40px_rgba(0,0,0,0.6)]`}>
        {/* Inner glass container - translucent dark purple gradient */}
        <div className="flex items-center space-x-6 sm:space-x-8 px-6 sm:px-10 py-3 rounded-[2rem] bg-gradient-to-b from-[#31253C]/60 to-[#191321]/60 backdrop-blur-xl shadow-inner border border-white/5">
          
          <button 
            onClick={() => navigate('/new-arrivals')} 
            title="Novedades" 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
          >
            <Sparkles size={22} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={() => navigate('/favorites')} 
            title="Favoritos" 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
          >
            <Heart size={22} strokeWidth={1.5} className={favorites.length > 0 ? "fill-current" : ""} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FCF6BA] rounded-full shadow-[0_0_8px_rgba(252,246,186,0.8)]"></span>
            )}
          </button>

          <button 
            onClick={() => navigate('/promotions')} 
            title="Ofertas" 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
          >
            <Tag size={22} strokeWidth={1.5} />
          </button>

          {/* Catalog / Grid - Special central/highlighted button with large textured gold ring */}
          <button 
            onClick={() => navigate('/')} 
            title="Catálogo" 
            className={`relative w-16 h-16 rounded-full flex items-center justify-center p-[3px] ${goldGradient} shadow-[0_0_20px_rgba(191,149,63,0.4)] hover:scale-105 transition-transform duration-300 mx-2`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2E2036] to-[#120B16] flex items-center justify-center border border-black/50 shadow-inner">
              <Grid3X3 size={24} strokeWidth={1.5} className={iconColor} />
            </div>
          </button>

          <button 
            onClick={() => navigate('/cart')} 
            title="Carrito" 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor} hover:text-white hover:bg-white/10 transition-all duration-300 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
          >
            <ShoppingBag size={22} strokeWidth={1.5} className={cart.length > 0 ? "fill-current" : ""} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FCF6BA] rounded-full shadow-[0_0_8px_rgba(252,246,186,0.8)]"></span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default FabNav;

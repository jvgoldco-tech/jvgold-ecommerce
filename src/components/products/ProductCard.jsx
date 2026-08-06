import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';

const ProductCard = ({ product }) => {
  const toggleFavorite = useStore(state => state.toggleFavorite);
  const toggleCart = useStore(state => state.toggleCart);
  const favorites = useStore(state => state.favorites);
  const cart = useStore(state => state.cart);

  const isFav = favorites.includes(product.id);
  const isCart = cart.includes(product.id);

  return (
    <div className="group relative bg-white border border-black/5 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] tracking-widest px-2 py-1 uppercase">NEW</span>
          )}
          {product.promoPrice && (
            <span className="bg-accent text-white text-[10px] tracking-widest px-2 py-1 uppercase">PROMO</span>
          )}
          {product.status && product.status !== 'IN STOCK' && (
            <span className="bg-white/90 text-primary text-[10px] tracking-widest px-2 py-1 uppercase">{product.status}</span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => toggleFavorite(product.id)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:text-accent transition-colors"
          >
            <Heart size={16} className={isFav ? "fill-accent text-accent" : ""} />
          </button>
          <button 
            onClick={() => toggleCart(product.id)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:text-accent transition-colors"
          >
            <ShoppingBag size={16} className={isCart ? "fill-accent text-accent" : ""} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 text-center">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display text-sm md:text-lg mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
            <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-primary/40 block mb-2">{product.category}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          {product.priceOnRequest ? (
            <span className="font-serif italic text-primary/60">Price on request</span>
          ) : product.promoPrice ? (
            <div className="flex space-x-2 items-center">
              <span className="text-primary/40 line-through text-sm">${(product.priceSale || 0).toLocaleString()}</span>
              <span className="text-accent font-medium">${product.promoPrice.toLocaleString()}</span>
            </div>
          ) : (
            <span className="text-primary font-medium text-sm md:text-base">${(product.priceSale || 0).toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

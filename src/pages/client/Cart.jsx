import React from 'react';
import { useStore } from '../../store/useStore';

const Cart = () => {
  const products = useStore(state => state.products);
  const cart = useStore(state => state.cart);
  const whatsappNumber = useStore(state => state.siteConfig.whatsappNumber);

  const cartProducts = products.filter(p => cart.includes(p.id));

  const handleCartWhatsapp = () => {
    const itemsText = cartProducts.map((p, idx) => {
      const priceStr = p.priceOnRequest ? "Precio bajo consulta" : `$${p.promoPrice || p.priceSale}`;
      return `${idx + 1}. ${p.name} - ${priceStr}`;
    }).join('%0A');
    
    const message = `¡Hola! Me gustaría consultar sobre los siguientes artículos en mi carrito:%0A%0A${itemsText}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-display mb-12">Shopping Cart</h1>
      
      {cartProducts.length === 0 ? (
        <div className="text-center py-12 text-primary/60">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartProducts.map(p => (
            <div key={p.id} className="flex items-center space-x-6 border-b border-black/10 pb-6">
              <img src={p.image} alt={p.name} className="w-24 h-24 object-cover" />
              <div className="flex-1">
                <h3 className="font-display text-lg">{p.name}</h3>
                <p className="text-sm text-primary/60 mb-2">{p.category}</p>
                <div className="text-sm">
                  {p.priceOnRequest ? (
                    <span className="italic text-primary/60">Price on request</span>
                  ) : p.promoPrice ? (
                    <div className="flex space-x-2">
                      <span className="line-through text-primary/40">${(p.priceSale || 0).toLocaleString()}</span>
                      <span className="text-accent font-medium">${p.promoPrice.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="font-medium">${(p.promoPrice || p.priceSale || 0).toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-8 border-t border-black/10">
            <button 
              onClick={handleCartWhatsapp}
              className="bg-whatsapp text-white px-8 py-4 tracking-widest text-sm hover:bg-[#083a28] transition-colors flex items-center space-x-3"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>SEND SELECTION VIA WHATSAPP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

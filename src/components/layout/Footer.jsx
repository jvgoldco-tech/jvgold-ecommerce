import React from 'react';
import { useStore } from '../../store/useStore';

const Footer = () => {
  const footerConfig = useStore(state => state.siteConfig.footer);

  return (
    <footer className="w-full bg-[#16110f] text-white pt-24 pb-32 px-6 border-t border-accent/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Brand */}
        <div className="flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="font-display text-4xl md:text-5xl tracking-widest mb-4 text-white">{footerConfig.title}</h2>
          <p className="font-serif italic text-white/50 text-sm">
            {footerConfig.subtitle}
          </p>
        </div>

        {/* Right Side: Newsletter (Mix of styles) */}
        <div className="flex-1 w-full max-w-md bg-white/5 p-8 border border-white/10 shadow-2xl backdrop-blur-sm">
          <span className="text-accent text-[9px] tracking-[0.2em] uppercase mb-4 block">{footerConfig.newsletterTitle}</span>
          <p className="text-white/80 text-sm mb-8 font-light">
            {footerConfig.newsletterSubtitle}
          </p>
          <form className="flex flex-col sm:flex-row items-end gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 w-full">
              <label className="text-white/40 text-[10px] mb-2 block">Your Email ID</label>
              <input 
                type="email" 
                placeholder="email@example.com*" 
                required
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-accent text-white placeholder-white/20 transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="text-[10px] tracking-widest uppercase border border-white/20 text-white px-8 py-3 hover:bg-accent hover:border-accent hover:text-white transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

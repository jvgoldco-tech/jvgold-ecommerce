import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

const Settings = () => {
  const whatsappNumber = useStore(state => state.siteConfig.whatsappNumber);
  const updateWhatsappNumber = useStore(state => state.updateWhatsappNumber);
  const [num, setNum] = useState(whatsappNumber);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateWhatsappNumber(num);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h2 className="text-3xl font-display mb-2">Settings</h2>
        <span className="text-xs tracking-widest text-primary/40 uppercase">CONTACT DETAILS</span>
      </div>

      <div className="bg-white border border-black/5 p-8">
        <h3 className="text-lg font-medium mb-1">WhatsApp Business</h3>
        <p className="text-sm font-serif italic text-primary/60 mb-6">Receiving number for inquiries and cart sends. Without the + symbol.</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">WhatsApp Number</label>
            <input 
              type="text" 
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className="w-full bg-[#f9f9f9] border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleSave}
              className={`px-8 py-3 text-xs tracking-widest uppercase transition-colors ${saved ? 'bg-whatsapp text-white' : 'bg-primary text-white hover:bg-black'}`}
            >
              {saved ? 'SAVED' : 'SAVE'}
            </button>
          </div>
        </div>
        
        <div className="bg-[#f9f9f9] border border-black/5 p-4">
          <label className="block text-[10px] tracking-widest text-primary/40 uppercase mb-2">PREVIEW LINK</label>
          <span className="text-sm text-primary/60 font-mono break-all">https://wa.me/{num}?text=Hola+Jewelry+Prime...</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;

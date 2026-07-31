import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Trash2, Plus, MessageCircle } from 'lucide-react';

const SiteEditor = () => {
  const heroConfig = useStore(state => state.siteConfig.hero);
  const footerConfig = useStore(state => state.siteConfig.footer);
  const whatsappNumber = useStore(state => state.siteConfig.whatsappNumber);
  const catalogs = useStore(state => state.catalogs);
  const collections = catalogs.collections;

  const updateHeroConfig = useStore(state => state.updateHeroConfig);
  const updateFooterConfig = useStore(state => state.updateFooterConfig);
  const updateWhatsappNumber = useStore(state => state.updateWhatsappNumber);
  
  const addCatalogItem = useStore(state => state.addCatalogItem);
  const updateCatalogItem = useStore(state => state.updateCatalogItem);
  const deleteCatalogItem = useStore(state => state.deleteCatalogItem);

  const [activeTab, setActiveTab] = useState('HERO'); // HERO | COLLECTIONS | FOOTER | WHATSAPP
  
  const [heroForm, setHeroForm] = useState(heroConfig);
  const [footerForm, setFooterForm] = useState(footerConfig);
  const [waForm, setWaForm] = useState(whatsappNumber);
  const [isSaved, setIsSaved] = useState(true);
  const [expandedCollection, setExpandedCollection] = useState(null);

  const handleHeroChange = (field, value) => {
    setHeroForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleFooterChange = (field, value) => {
    setFooterForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveAll = () => {
    if (activeTab === 'HERO') updateHeroConfig(heroForm);
    if (activeTab === 'FOOTER') updateFooterConfig(footerForm);
    if (activeTab === 'WHATSAPP') updateWhatsappNumber(waForm);
    setIsSaved(true);
  };

  const handleAddCollection = () => {
    addCatalogItem('collections', {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Collection',
      coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      description: 'Enter description here.',
    });
  };

  const renderLivePreview = () => {
    if (activeTab === 'HERO') {
      return (
        <div className="absolute inset-0 bg-primary flex flex-col p-6">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: `url(${heroForm.backgroundImage})` }} />
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <span className="text-accent text-[8px] tracking-widest mb-2">FINE JEWELRY</span>
            <h1 className="text-white font-display text-2xl leading-tight mb-2">
              {heroForm.headline} <span className="text-accent italic font-serif">{heroForm.highlightedWord}</span>
            </h1>
            <p className="text-white/80 font-serif italic text-xs mb-4">{heroForm.subtitle}</p>
            <div>
              <button className="border border-white/40 text-white text-[8px] tracking-widest px-3 py-1">{heroForm.ctaLabel}</button>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'COLLECTIONS') {
      return (
        <div className="absolute inset-0 p-4 bg-background overflow-auto">
          <div className="text-center mb-4">
            <h2 className="font-display text-xl">Our Collections</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {collections.map(c => (
              <div key={c.id} className="relative aspect-[3/4] bg-primary">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${c.coverImage})` }} />
                <div className="absolute bottom-2 left-2 text-white font-display text-[10px]">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'FOOTER') {
      return (
        <div className="absolute inset-0 bg-[#16110f] p-4 flex flex-col justify-center">
          <h2 className="font-display text-xl text-white mb-2">{footerForm.title}</h2>
          <p className="font-serif italic text-white/50 text-[10px] mb-8">{footerForm.subtitle}</p>
          
          <div className="bg-white/5 p-4 border border-white/10">
            <span className="text-accent text-[8px] tracking-widest uppercase mb-2 block">{footerForm.newsletterTitle}</span>
            <p className="text-white/80 text-[10px] mb-4">{footerForm.newsletterSubtitle}</p>
            <div className="border-b border-white/20 pb-1 flex justify-between">
              <span className="text-white/40 text-[10px]">email@example.com</span>
              <span className="text-white text-[8px] uppercase">Subscribe</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'WHATSAPP') {
      return (
        <div className="absolute inset-0 bg-background flex flex-col items-center justify-center relative">
           <div className="text-center p-8 text-primary/40 text-xs">Page Content Here</div>
           <div className="absolute bottom-6 right-6">
             <div className="bg-[#128C7E] text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-xl shadow-green-900/20">
               <MessageCircle size={16} />
               <span className="text-[10px] uppercase tracking-widest font-medium">WhatsApp</span>
             </div>
           </div>
           <div className="absolute top-4 right-4 bg-white shadow p-3 rounded text-xs border border-black/10">
             Links to: <br/><strong>https://wa.me/{waForm}</strong>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-12 h-full">
      {/* Editor Panel */}
      <div className="flex-1 xl:max-w-2xl flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-display mb-2">Site Editor</h2>
          <span className="text-xs tracking-widest text-primary/40 uppercase">CUSTOMIZE STOREFRONT PAGES</span>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-black/5 mb-8 overflow-x-auto whitespace-nowrap">
          {['HERO', 'COLLECTIONS', 'FOOTER', 'WHATSAPP'].map(tab => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setIsSaved(true); }}
              className={`pb-4 text-xs tracking-widest uppercase transition-colors relative ${activeTab === tab ? 'text-primary font-medium' : 'text-primary/40 hover:text-primary'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto pr-4 pb-12">
          
          {activeTab === 'HERO' && (
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Background Image URL</label>
                <input 
                  type="text" 
                  value={heroForm.backgroundImage}
                  onChange={(e) => handleHeroChange('backgroundImage', e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent mb-2" 
                />
                {heroForm.backgroundImage && (
                  <div className="w-full h-24 bg-gray-100 overflow-hidden border border-black/5">
                    <img src={heroForm.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Headline</label>
                  <input type="text" value={heroForm.headline} onChange={(e) => handleHeroChange('headline', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Highlighted Word</label>
                  <input type="text" value={heroForm.highlightedWord} onChange={(e) => handleHeroChange('highlightedWord', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Subtitle</label>
                <textarea rows="3" value={heroForm.subtitle} onChange={(e) => handleHeroChange('subtitle', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">CTA Button Label</label>
                  <input type="text" value={heroForm.ctaLabel} onChange={(e) => handleHeroChange('ctaLabel', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Footer Tagline</label>
                  <input type="text" value={heroForm.footerTagline} onChange={(e) => handleHeroChange('footerTagline', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FOOTER' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Brand Title</label>
                  <input type="text" value={footerForm.title} onChange={(e) => handleFooterChange('title', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Brand Subtitle</label>
                  <input type="text" value={footerForm.subtitle} onChange={(e) => handleFooterChange('subtitle', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Newsletter Title</label>
                <input type="text" value={footerForm.newsletterTitle} onChange={(e) => handleFooterChange('newsletterTitle', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Newsletter Subtitle</label>
                <textarea rows="3" value={footerForm.newsletterSubtitle} onChange={(e) => handleFooterChange('newsletterSubtitle', e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
          )}

          {activeTab === 'WHATSAPP' && (
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">WhatsApp Number</label>
                <p className="text-xs text-primary/50 mb-2">Include your country code, without the + sign. Example: 1234567890</p>
                <input 
                  type="text" 
                  value={waForm} 
                  onChange={(e) => { setWaForm(e.target.value); setIsSaved(false); }} 
                  className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
                />
              </div>
            </div>
          )}

          {activeTab === 'COLLECTIONS' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-sm font-medium">{collections.length} Collections</span>
                 <button onClick={handleAddCollection} className="flex items-center space-x-2 text-xs tracking-widest bg-primary text-white px-4 py-2 hover:bg-black">
                   <Plus size={14} /> <span>ADD COLLECTION</span>
                 </button>
              </div>
              {collections.map(c => (
                <div key={c.id} className="bg-white border border-black/5 overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f9f9f9]"
                    onClick={() => setExpandedCollection(expandedCollection === c.id ? null : c.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 overflow-hidden">
                        <img src={c.coverImage} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={(e) => { e.stopPropagation(); deleteCatalogItem('collections', c.id); }} className="text-primary/40 hover:text-red-500 p-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {expandedCollection === c.id && (
                    <div className="p-4 border-t border-black/5 bg-[#fbfbfb] space-y-4">
                      <div>
                        <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Name</label>
                        <input type="text" value={c.name} onChange={(e) => updateCatalogItem('collections', c, { ...c, name: e.target.value })} className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Cover Image URL</label>
                        <input type="text" value={c.coverImage} onChange={(e) => updateCatalogItem('collections', c, { ...c, coverImage: e.target.value })} className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Description</label>
                        <textarea rows="3" value={c.description} onChange={(e) => updateCatalogItem('collections', c, { ...c, description: e.target.value })} className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="w-full xl:w-96 flex flex-col shrink-0 sticky top-12 h-[calc(100vh-6rem)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest text-primary/60 uppercase flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> LIVE PREVIEW</span>
          {!isSaved && activeTab !== 'COLLECTIONS' && <span className="text-[10px] tracking-widest text-accent uppercase">● Unsaved</span>}
        </div>
        
        {/* Browser Frame */}
        <div className="bg-white border border-black/10 rounded-t-lg shadow-sm flex flex-col flex-1 overflow-hidden">
          <div className="h-8 bg-[#f5f5f5] border-b border-black/5 flex items-center px-4 space-x-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
            <div className="flex-1 mx-4 h-4 bg-white border border-black/5 rounded-full"></div>
          </div>
          
          <div className="flex-1 bg-background overflow-hidden relative">
             {renderLivePreview()}
          </div>
        </div>

        {activeTab !== 'COLLECTIONS' && (
          <button 
            onClick={handleSaveAll}
            className={`mt-4 w-full py-4 text-xs tracking-widest uppercase transition-colors flex justify-center items-center ${isSaved ? 'bg-[#e5f5e0] text-[#0b4f37]' : 'bg-[#fbf5e6] text-accent hover:bg-accent hover:text-white'}`}
          >
            {isSaved ? 'SAVED' : 'SAVE CHANGES'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SiteEditor;

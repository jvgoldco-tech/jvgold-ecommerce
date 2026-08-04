import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Trash2, Plus, MessageCircle } from 'lucide-react';
import ImageCropper from '../../components/ui/ImageCropper';

const TextInputWithCount = ({ label, value, onChange, maxLength, type = 'text', ...props }) => {
  const remaining = maxLength - (value ? value.length : 0);
  return (
    <div>
      <label className="flex justify-between items-end mb-2">
        <span className="block text-[10px] tracking-widest text-primary/60 uppercase">{label}</span>
        <span className={`text-[10px] tracking-widest ${remaining <= 10 ? 'text-red-500 font-bold' : 'text-primary/40'}`}>
          {remaining} restantes
        </span>
      </label>
      <input 
        type={type}
        value={value} 
        onChange={(e) => onChange(e.target.value.substring(0, maxLength))} 
        maxLength={maxLength}
        className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
        {...props}
      />
    </div>
  );
};

const TextAreaWithCount = ({ label, value, onChange, maxLength, ...props }) => {
  const remaining = maxLength - (value ? value.length : 0);
  return (
    <div>
      <label className="flex justify-between items-end mb-2">
        <span className="block text-[10px] tracking-widest text-primary/60 uppercase">{label}</span>
        <span className={`text-[10px] tracking-widest ${remaining <= 20 ? 'text-red-500 font-bold' : 'text-primary/40'}`}>
          {remaining} restantes
        </span>
      </label>
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value.substring(0, maxLength))} 
        maxLength={maxLength}
        className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent" 
        {...props}
      />
    </div>
  );
};

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

  const [activeTab, setActiveTab] = useState('BRAND'); // BRAND | TEXTS | HERO | COLLECTIONS | FOOTER | WHATSAPP
  
  const [brandForm, setBrandForm] = useState(useStore(state => state.siteConfig.brand));
  const [uiTextsForm, setUiTextsForm] = useState(useStore(state => state.siteConfig.uiTexts));
  const [heroForm, setHeroForm] = useState(heroConfig);
  const [footerForm, setFooterForm] = useState(footerConfig);
  const [waForm, setWaForm] = useState(whatsappNumber);
  const [isSaved, setIsSaved] = useState(true);
  const [expandedCollection, setExpandedCollection] = useState(null);

  const updateBrandConfig = useStore(state => state.updateBrandConfig);
  const updateUiTexts = useStore(state => state.updateUiTexts);

  const handleBrandChange = (field, value) => {
    setBrandForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleUiTextsChange = (field, value) => {
    setUiTextsForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleHeroChange = (field, value) => {
    setHeroForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleFooterChange = (field, value) => {
    setFooterForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveAll = () => {
    if (activeTab === 'BRAND') updateBrandConfig(brandForm);
    if (activeTab === 'TEXTS') updateUiTexts(uiTextsForm);
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
    if (activeTab === 'BRAND') {
      return (
        <div className="absolute inset-0 bg-background flex items-center justify-center p-6">
           <div className="bg-white p-6 shadow-sm border border-black/5 rounded-xl flex items-center justify-center">
             {brandForm.displayMode === 'LOGO' || brandForm.displayMode === 'BOTH' ? (
               <img src={brandForm.logoUrl || 'https://via.placeholder.com/150?text=LOGO'} alt="Brand Logo" className="h-12 mr-4 object-contain" />
             ) : null}
             {brandForm.displayMode === 'TEXT' || brandForm.displayMode === 'BOTH' ? (
               <h1 className="font-display text-2xl tracking-widest text-black">
                 {brandForm.name}
               </h1>
             ) : null}
           </div>
        </div>
      );
    }
    
    if (activeTab === 'TEXTS') {
      return (
        <div className="absolute inset-0 bg-background flex flex-col p-6 space-y-4">
           <div className="bg-white p-4 shadow-sm border border-black/5 rounded-xl text-center">
             <span className="text-[10px] tracking-widest uppercase mb-2 block">{uiTextsForm.newArrivals}</span>
           </div>
           <div className="bg-white p-4 shadow-sm border border-black/5 rounded-xl text-center">
             <span className="text-[10px] tracking-widest uppercase mb-2 block">{uiTextsForm.viewCatalog}</span>
           </div>
           <div className="bg-white p-4 shadow-sm border border-black/5 rounded-xl">
             <span className="text-gray-400 text-sm block">{uiTextsForm.searchPlaceholder}</span>
           </div>
        </div>
      );
    }

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
          {['BRAND', 'TEXTS', 'HERO', 'COLLECTIONS', 'FOOTER', 'WHATSAPP'].map(tab => (
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
          
          {activeTab === 'BRAND' && (
            <div className="space-y-6">
              <TextInputWithCount 
                label="Brand Name" 
                value={brandForm.name} 
                onChange={(v) => handleBrandChange('name', v)} 
                maxLength={30} 
              />
              <ImageCropper 
                label="Logo Image (Proporción libre)"
                aspectRatio={null} 
                currentImageUrl={brandForm.logoUrl}
                onUploadSuccess={(url) => handleBrandChange('logoUrl', url)}
              />
              <div>
                <label className="block text-[10px] tracking-widest text-primary/60 uppercase mb-2">Display Mode</label>
                <select 
                  value={brandForm.displayMode} 
                  onChange={(e) => handleBrandChange('displayMode', e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                >
                  <option value="TEXT">Text Only</option>
                  <option value="LOGO">Logo Only</option>
                  <option value="BOTH">Text and Logo</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'TEXTS' && (
            <div className="space-y-6">
              <TextInputWithCount label='"New Arrivals" Text' value={uiTextsForm.newArrivals} onChange={v => handleUiTextsChange('newArrivals', v)} maxLength={40} />
              <TextInputWithCount label='"View Catalog" Text' value={uiTextsForm.viewCatalog} onChange={v => handleUiTextsChange('viewCatalog', v)} maxLength={40} />
              <TextInputWithCount label='Search Placeholder' value={uiTextsForm.searchPlaceholder} onChange={v => handleUiTextsChange('searchPlaceholder', v)} maxLength={50} />
            </div>
          )}

          {activeTab === 'HERO' && (
            <div className="space-y-6">
              <ImageCropper 
                label="Background Image (Hero 16:9)"
                aspectRatio={16/9} 
                currentImageUrl={heroForm.backgroundImage}
                onUploadSuccess={(url) => handleHeroChange('backgroundImage', url)}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInputWithCount label='Headline' value={heroForm.headline} onChange={v => handleHeroChange('headline', v)} maxLength={50} />
                <TextInputWithCount label='Highlighted Word' value={heroForm.highlightedWord} onChange={v => handleHeroChange('highlightedWord', v)} maxLength={30} />
              </div>
              <TextAreaWithCount label='Subtitle' rows="3" value={heroForm.subtitle} onChange={v => handleHeroChange('subtitle', v)} maxLength={150} />
              <div className="grid grid-cols-2 gap-4">
                <TextInputWithCount label='CTA Button Label' value={heroForm.ctaLabel} onChange={v => handleHeroChange('ctaLabel', v)} maxLength={30} />
                <TextInputWithCount label='Footer Tagline' value={heroForm.footerTagline} onChange={v => handleHeroChange('footerTagline', v)} maxLength={80} />
              </div>
            </div>
          )}

          {activeTab === 'FOOTER' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <TextInputWithCount label='Brand Title' value={footerForm.title} onChange={v => handleFooterChange('title', v)} maxLength={50} />
                <TextInputWithCount label='Brand Subtitle' value={footerForm.subtitle} onChange={v => handleFooterChange('subtitle', v)} maxLength={100} />
              </div>
              <TextInputWithCount label='Newsletter Title' value={footerForm.newsletterTitle} onChange={v => handleFooterChange('newsletterTitle', v)} maxLength={50} />
              <TextAreaWithCount label='Newsletter Subtitle' rows="3" value={footerForm.newsletterSubtitle} onChange={v => handleFooterChange('newsletterSubtitle', v)} maxLength={150} />
            </div>
          )}

          {activeTab === 'WHATSAPP' && (
            <div className="space-y-6">
              <TextInputWithCount 
                label="WhatsApp Number" 
                value={waForm} 
                onChange={(v) => { setWaForm(v); setIsSaved(false); }} 
                maxLength={20} 
              />
              <p className="text-xs text-primary/50 mt-2">Include your country code, without the + sign. Example: 1234567890</p>
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
                      <TextInputWithCount 
                        label="Name" 
                        value={c.name} 
                        onChange={v => updateCatalogItem('collections', c, { ...c, name: v })} 
                        maxLength={40} 
                      />
                      <ImageCropper 
                        label="Cover Image (Proporción 3:4)"
                        aspectRatio={3/4} 
                        currentImageUrl={c.coverImage}
                        onUploadSuccess={(url) => updateCatalogItem('collections', c, { ...c, coverImage: url })}
                      />
                      <TextAreaWithCount 
                        label="Description" 
                        rows="3" 
                        value={c.description} 
                        onChange={v => updateCatalogItem('collections', c, { ...c, description: v })} 
                        maxLength={150} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="w-full xl:w-96 flex flex-col shrink-0 sticky top-12 h-full min-h-[500px]">
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

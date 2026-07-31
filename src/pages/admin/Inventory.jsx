import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, Trash2, X, Search, Image as ImageIcon } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
  const catalogs = useStore(state => state.catalogs);
  const collections = catalogs.collections;
  
  const [formData, setFormData] = useState(product || {
    name: '',
    category: catalogs.categories[0],
    collectionId: '',
    gender: catalogs.genders[0],
    brand: catalogs.brands[0],
    materials: [catalogs.materials[0]],
    color: catalogs.colors[0],
    stone: catalogs.stones[0],
    size: catalogs.sizes[0],
    pricePurchase: '',
    priceSale: '',
    stockInitial: '',
    stockCurrent: '',
    stockMinimum: 2,
    location: catalogs.locations[0],
    image: '',
    isNew: true
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'materials') {
      const opts = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, materials: opts });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      stockInitial: Number(formData.stockInitial) || Number(formData.stockCurrent),
      stockCurrent: Number(formData.stockCurrent) || Number(formData.stockInitial),
      pricePurchase: Number(formData.pricePurchase) || 0,
      priceSale: Number(formData.priceSale) || 0,
      stockMinimum: Number(formData.stockMinimum) || 2
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-black/10 flex justify-between items-center bg-[#fbfbfb]">
          <h2 className="text-2xl font-display">{product ? 'Edit Product' : 'Quick Add Product'}</h2>
          <button onClick={onClose} className="text-primary/40 hover:text-primary"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-8">
           {/* Left side: Image & Core */}
           <div className="w-full md:w-1/3 flex flex-col space-y-6">
             <div className="w-full aspect-[4/5] bg-black/5 flex flex-col items-center justify-center relative border border-dashed border-black/20">
               {formData.image ? (
                 <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
               ) : (
                 <div className="text-primary/40 flex flex-col items-center">
                   <ImageIcon size={32} className="mb-2" />
                   <span className="text-xs uppercase tracking-widest">No Image</span>
                 </div>
               )}
             </div>
             
             <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Image URL 📷</label>
                <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none" />
             </div>
             <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Product Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none" />
             </div>
             <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Sale Price *</label>
                <input required type="number" name="priceSale" value={formData.priceSale} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none" />
             </div>
           </div>

           {/* Right side: Catalogs & Stock */}
           <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.genders.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Material</label>
                <select name="materials" multiple value={formData.materials} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none h-20">
                  {catalogs.materials.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Color</label>
                <select name="color" value={formData.color} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Stone</label>
                <select name="stone" value={formData.stone} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.stones.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Size</label>
                <select name="size" value={formData.size} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.sizes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Collection</label>
                <select name="collectionId" value={formData.collectionId} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  <option value="">None</option>
                  {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Location</label>
                <select name="location" value={formData.location} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none">
                  {catalogs.locations.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Current Stock *</label>
                <input required type="number" name="stockCurrent" value={formData.stockCurrent} onChange={handleChange} className="w-full border border-black/20 px-4 py-2 text-sm focus:border-primary focus:outline-none" />
              </div>
              
              <div>
                <label className="text-[10px] tracking-widest uppercase text-primary/60 mb-2 block">Mark as "New Arrival"</label>
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="w-4 h-4" />
              </div>

           </div>
        </form>

        <div className="p-6 border-t border-black/10 bg-[#fbfbfb] flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-3 border border-black/20 text-xs tracking-widest uppercase hover:bg-black/5">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-primary text-white text-xs tracking-widest uppercase hover:bg-black">Save Product</button>
        </div>
      </div>
    </div>
  );
};

const Inventory = () => {
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const deleteProduct = useStore(state => state.deleteProduct);
  const catalogs = useStore(state => state.catalogs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Smart Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.materials && p.materials.some(m => m.toLowerCase().includes(q)))
      );
    }

    if (filterCategory !== 'All') result = result.filter(p => p.category === filterCategory);
    if (filterStatus !== 'All') {
      if (filterStatus === 'Available') result = result.filter(p => p.status.includes('Disponible'));
      if (filterStatus === 'Low Stock') result = result.filter(p => p.status.includes('Poco stock'));
      if (filterStatus === 'Out of Stock') result = result.filter(p => p.status.includes('Agotado'));
    }

    // Sort
    if (sortBy === 'Newest') result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === 'Price High') result = [...result].sort((a, b) => b.priceSale - a.priceSale);
    if (sortBy === 'Price Low') result = [...result].sort((a, b) => a.priceSale - b.priceSale);

    return result;
  }, [products, searchQuery, filterCategory, filterStatus, sortBy]);

  const handleSave = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const getStatusBadge = (status) => {
    if (status?.includes('Disponible')) return <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] rounded-full">{status}</span>;
    if (status?.includes('Poco stock')) return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-[10px] rounded-full">{status}</span>;
    if (status?.includes('Agotado')) return <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] rounded-full">{status}</span>;
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] rounded-full">{status}</span>;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-display mb-2">Inventory</h2>
          <span className="text-xs tracking-widest text-primary/40 uppercase">{products.length} PIECES</span>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="bg-primary text-white px-6 py-3 text-xs tracking-widest uppercase flex items-center space-x-2 hover:bg-black transition-colors"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Intelligent Search & Filters */}
      <div className="bg-white p-4 border border-black/5 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
          <input 
            type="text" 
            placeholder="Smart Search (name, sku, material, category...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fbfbfb] border border-black/10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-white border border-black/10 py-2 px-4 text-sm focus:outline-none">
            <option value="All">All Categories</option>
            {catalogs.categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-white border border-black/10 py-2 px-4 text-sm focus:outline-none">
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-black/10 py-2 px-4 text-sm focus:outline-none">
            <option value="Newest">Newest First</option>
            <option value="Price High">Highest Price</option>
            <option value="Price Low">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-white border border-black/5 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fbfbfb] border-b border-black/10">
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal">Piece</th>
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal">SKU</th>
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal">Category</th>
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal">Price</th>
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal">Stock & Status</th>
                <th className="p-4 text-[10px] tracking-widest text-primary/60 uppercase font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-black/5 hover:bg-[#fbfbfb] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover bg-black/5" />
                      <div>
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-primary/40">{product.materials?.join(', ')} · {product.color}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-mono">{product.sku}</td>
                  <td className="p-4 text-xs">{product.category}</td>
                  <td className="p-4 text-sm">${(product.priceSale || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex flex-col items-start space-y-1">
                      {getStatusBadge(product.status)}
                      <div className="w-24 h-1 bg-black/10 mt-2">
                        <div 
                          className={`h-full ${product.stockCurrent > 0 ? (product.stockCurrent <= product.stockMinimum ? 'bg-yellow-500' : 'bg-green-500') : 'bg-red-500'}`} 
                          style={{ width: `${Math.min((product.stockCurrent / Math.max(product.stockInitial || 1, 10)) * 100, 100)}%` }} 
                        />
                      </div>
                      <span className="text-[10px] text-primary/40">{product.stockCurrent} in stock</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                      className="text-primary/60 hover:text-accent p-2"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="text-primary/60 hover:text-red-500 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={editingProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Inventory;

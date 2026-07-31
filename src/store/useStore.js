import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProducts, initialCatalogs } from '../data/mockData';

const calculateStatus = (current, min) => {
  if (current <= 0) return '🔴 Agotado';
  if (current <= min) return '🟡 Poco stock';
  return '🟢 Disponible';
};

const generateSku = (category, products) => {
  const prefix = category.substring(0, 3).toUpperCase();
  const categoryProducts = products.filter(p => p.sku && p.sku.startsWith(prefix));
  
  let maxNum = 0;
  categoryProducts.forEach(p => {
    const parts = p.sku.split('-');
    if (parts.length === 2) {
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  
  const nextNum = (maxNum + 1).toString().padStart(4, '0');
  return `${prefix}-${nextNum}`;
};

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      products: mockProducts,
      catalogs: initialCatalogs,
      siteConfig: {
        whatsappNumber: '1234567890',
        hero: {
          backgroundImage: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80',
          headline: 'Pieces that',
          highlightedWord: 'endure',
          subtitle: 'Every jewel tells a story of craftsmanship and distinction.',
          ctaLabel: 'EXPLORE COLLECTION',
          footerTagline: 'COLLECTION 2026 · ONE-OF-A-KIND PIECES',
        },
        footer: {
          title: 'JEWELRY PRIME',
          subtitle: 'Fine Jewelry · Precision Craftsmanship',
          newsletterTitle: 'Exclusive Access',
          newsletterSubtitle: 'Subscribe to receive notices of private promotions and early access to our newest pieces.'
        }
      },
      cart: [],
      favorites: [],

      // Catalog Actions
      addCatalogItem: (catalogName, item) => set(state => ({
        catalogs: {
          ...state.catalogs,
          [catalogName]: [...state.catalogs[catalogName], item]
        }
      })),
      updateCatalogItem: (catalogName, oldItem, newItem) => set(state => {
        // If it's an array of objects (like collections) or array of strings
        const list = state.catalogs[catalogName];
        if (catalogName === 'collections') {
          return {
            catalogs: {
              ...state.catalogs,
              collections: list.map(c => c.id === oldItem.id ? { ...c, ...newItem } : c)
            }
          };
        }
        return {
          catalogs: {
            ...state.catalogs,
            [catalogName]: list.map(i => i === oldItem ? newItem : i)
          }
        };
      }),
      deleteCatalogItem: (catalogName, itemOrId) => set(state => {
        const list = state.catalogs[catalogName];
        if (catalogName === 'collections') {
          return {
            catalogs: { ...state.catalogs, collections: list.filter(c => c.id !== itemOrId) }
          };
        }
        return {
          catalogs: { ...state.catalogs, [catalogName]: list.filter(i => i !== itemOrId) }
        };
      }),

      // Inventory Actions
      addProduct: (product) => set(state => {
        const now = new Date().toISOString();
        const sku = generateSku(product.category, state.products);
        const status = calculateStatus(Number(product.stockCurrent), Number(product.stockMinimum));
        
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substr(2, 9),
          sku,
          status,
          createdAt: now,
          updatedAt: now,
          createdBy: 'Administrador',
          lastMovement: 'Alta Inicial'
        };
        return { products: [...state.products, newProduct] };
      }),
      
      updateProduct: (id, updatedData) => set(state => {
        return {
          products: state.products.map(p => {
            if (p.id === id) {
              const merged = { ...p, ...updatedData };
              merged.status = calculateStatus(Number(merged.stockCurrent), Number(merged.stockMinimum));
              merged.updatedAt = new Date().toISOString();
              return merged;
            }
            return p;
          })
        };
      }),
      
      deleteProduct: (id) => set(state => ({
        products: state.products.filter(p => p.id !== id)
      })),

      // Cart & Favorites
      addToCart: (id) => set(state => ({ cart: [...state.cart, id] })),
      removeFromCart: (id) => set(state => ({ cart: state.cart.filter(item => item !== id) })),
      toggleFavorite: (id) => set(state => {
        if (state.favorites.includes(id)) {
          return { favorites: state.favorites.filter(item => item !== id) };
        }
        return { favorites: [...state.favorites, id] };
      }),

      // Site Config
      updateHeroConfig: (config) => set(state => ({
        siteConfig: { ...state.siteConfig, hero: { ...state.siteConfig.hero, ...config } }
      })),
      updateFooterConfig: (config) => set(state => ({
        siteConfig: { ...state.siteConfig, footer: { ...state.siteConfig.footer, ...config } }
      })),
      updateWhatsappNumber: (num) => set(state => ({
        siteConfig: { ...state.siteConfig, whatsappNumber: num }
      }))
    }),
    {
      name: 'jewelry-prime-store-v2', // v2 to clear old state
    }
  )
);

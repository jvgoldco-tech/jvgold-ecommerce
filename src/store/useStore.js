import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProducts, initialCatalogs } from '../data/mockData';
import api from '../api/axios';

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
      // Auth State
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
          get().fetchFavorites();
        } catch (error) {
          set({ user: null, isAuthenticated: false, isCheckingAuth: false, favorites: [] });
        }
      },

      login: (userData) => {
        set({ user: userData, isAuthenticated: true });
        get().fetchFavorites();
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, isAuthenticated: false, favorites: [] });
        }
      },

      // State
      products: mockProducts,
      catalogs: initialCatalogs,
      businessSettings: null,
      siteConfig: {
        brand: {
          name: 'JV GOLD & CO LLC',
          logoUrl: '',
          displayMode: 'TEXT' // TEXT | LOGO | BOTH
        },
        whatsappNumber: '1234567890',
        hero: {
          backgroundImage: '',
          headline: 'Pieces that',
          highlightedWord: 'endure',
          subtitle: 'Every jewel tells a story of craftsmanship and distinction.',
          ctaLabel: 'EXPLORE COLLECTION',
          footerTagline: 'COLLECTION 2026 · ONE-OF-A-KIND PIECES',
          carouselProducts: [],
          autoplayInterval: 5000,
        },
        footer: {
          title: 'JV GOLD & CO LLC',
          subtitle: 'Fine Jewelry · Precision Craftsmanship',
          newsletterTitle: 'Exclusive Access',
          newsletterSubtitle: 'Subscribe to receive notices of private promotions and early access to our newest pieces.'
        },
        uiTexts: {
          newArrivals: 'NEW ARRIVALS',
          viewCatalog: 'VIEW CATALOG',
          searchPlaceholder: 'Search...'
        }
      },
      shoppingList: [],
      favorites: [],

      // API Actions
      fetchBusinessSettings: async () => {
        try {
          const response = await api.get('/settings');
          set({ businessSettings: response.data });
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      },
      updateBusinessSettings: async (newData) => {
        try {
          const response = await api.put('/settings', newData);
          set({ businessSettings: response.data });
        } catch (error) {
          console.error('Error updating settings:', error);
          throw error;
        }
      },

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
      reorderCatalogItems: (catalogName, newOrder) => set(state => ({
        catalogs: {
          ...state.catalogs,
          [catalogName]: newOrder
        }
      })),

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

      // Shopping List & Favorites
      addToShoppingList: (product) => set(state => {
        const existing = state.shoppingList.find(item => item.id === product.id);
        if (existing) {
          return {
            shoppingList: state.shoppingList.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { shoppingList: [...state.shoppingList, { id: product.id, quantity: 1, product }] };
      }),
      updateQuantity: (id, amount) => set(state => ({
        shoppingList: state.shoppingList.map(item => {
          if (item.id === id) {
            const newQ = Math.max(1, item.quantity + amount);
            return { ...item, quantity: newQ };
          }
          return item;
        })
      })),
      removeFromShoppingList: (id) => set(state => ({
        shoppingList: state.shoppingList.filter(item => item.id !== id)
      })),
      clearShoppingList: () => set({ shoppingList: [] }),

      fetchFavorites: async () => {
        try {
          const response = await api.get('/favorites');
          set({ favorites: response.data });
        } catch (error) {
          console.error('Error fetching favorites', error);
        }
      },

      showLoginPrompt: false,
      setShowLoginPrompt: (show) => set({ showLoginPrompt: show }),

      toggleFavorite: async (id) => {
        const state = get();
        if (!state.isAuthenticated) {
          set({ showLoginPrompt: true });
          return;
        }

        // Optimistic update
        const isFav = state.favorites.includes(id);
        set(state => ({
          favorites: isFav ? state.favorites.filter(item => item !== id) : [...state.favorites, id]
        }));

        try {
          await api.post(`/favorites/${id}`);
        } catch (error) {
          console.error('Error toggling favorite on server:', error);
          // Rollback if needed, though rare
          set(state => ({
            favorites: isFav ? [...state.favorites, id] : state.favorites.filter(item => item !== id)
          }));
        }
      },

      // Site Config
      updateBrandConfig: (config) => set(state => ({
        siteConfig: { ...state.siteConfig, brand: { ...state.siteConfig.brand, ...config } }
      })),
      updateUiTexts: (config) => set(state => ({
        siteConfig: { ...state.siteConfig, uiTexts: { ...state.siteConfig.uiTexts, ...config } }
      })),
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
      name: 'jv-gold-co-store-v7', // bumped version to clear old mock state
    }
  )
);

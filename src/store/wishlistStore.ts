/**
 * @file Defines the Zustand store for managing the users Wishlist.
 * @description Allows the state management of the wishlist for users. Both on Database(DB) and localStorage
 * @see useWishlist.ts - The wishlist hook that provides a clean, component-friendly interface to this store.
 * @see CartWishlistSyncProvider.tsx - The provider that orchestrates syncing this store with the database on login.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductCardType } from '@/types/product';
import toast from 'react-hot-toast';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';

interface WishlistState {
  items: ProductCardType[];
  isHydrated: boolean;
  isToggling: Set<string>;

  addToWishlist: (
    product: ProductCardType,
    isAuthenticated?: boolean
  ) => Promise<void>;
  removeFromWishlist: (
    productId: string,
    isAuthenticated?: boolean
  ) => Promise<void>;
  isProductInWishlist: (productId: string) => boolean;
  clearWishlist: (isAuthenticated: boolean) => void;
  _reset: () => void;

  // Sync methods
  setItems: (items: ProductCardType[]) => void;
  loadFromDatabase: (userId: string) => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      isToggling: new Set(),

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      setItems: (items: ProductCardType[]) => set({ items }),

      // Load wishlist from database for logged-in users
      loadFromDatabase: async () => {
        try {
          const response = await fetch('/api/user/wishlist');

          if (!response.ok) throw new Error('Failed to load wishlist');

          const data = await response.json();

          set({ items: data.items });
        } catch (error) {
          console.error('Failed to load Wishlist from database:', error);
        }
      },

      // Add Product to Wishlist - Function for local and server-side
      addToWishlist: async (
        product: ProductCardType,
        isAuthenticated = false
      ) => {
        const productId = product.id;
        if (get().isToggling.has(productId)) return;

        set((state) => ({
          isToggling: new Set(state.isToggling).add(productId),
        }));

        try {
          if (get().isProductInWishlist(productId)) {
            toast.error(`${product.name} is already in your Wishlist!`);
            return;
          }

          // If user is authenticated and demo mode is false, add to DB, else add to localStorage
          if (isAuthenticated && !isDemoMode) {
            const response = await fetch('/api/user/wishlist', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId: product.id }),
            });

            if (!response.ok) throw new Error('Failed to add to Wishlist');

            const data = await response.json();

            set({ items: data.items });
          } else {
            // DEMO MODE NOTIFICATION
            if (isAuthenticated && isDemoMode) {
              console.log(
                `%c${DEMO_SENTENCE_PREFIX} Using local storage for authenticated user.\nAdd product to Wishlist.`,
                'color: #7c3aed'
              );
            }

            set((state) => ({ items: [...state.items, product] }));
          }
          toast.success(
            `${DEMO_SENTENCE_PREFIX} ${product.name} added to Wishlist`
          );
        } catch (error) {
          console.error('Failed to add to Wishlist:', error);
          toast.error('Failed to add to Wishlist, Please try again.');
        } finally {
          // Set state to remove spinner animation
          set((state) => {
            const newSet = new Set(state.isToggling);
            newSet.delete(productId);
            return { isToggling: newSet };
          });
        }
      },

      // Remove Product from Wishlist - Function for local and DB
      removeFromWishlist: async (
        productId: string,
        isAuthenticated = false
      ) => {
        if (get().isToggling.has(productId)) return;

        set((state) => ({
          isToggling: new Set(state.isToggling).add(productId),
        }));

        // If user is authenticated and demo mode is false, remove from DB, else from localStorage
        try {
          if (isAuthenticated && !isDemoMode) {
            const response = await fetch(`/api/user/wishlist/${productId}`, {
              method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove from Wishlist');
            const data = await response.json();
            set({ items: data.items });
          } else {
            // DEMO MODE NOTIFICATION
            if (isAuthenticated && isDemoMode) {
              console.log(
                `%c${DEMO_SENTENCE_PREFIX} Using local storage for authenticated user.\nRemove product from Wishlist.`,
                'color: #7c3aed'
              );
            }

            set((state) => ({
              items: state.items.filter((item) => item.id !== productId),
            }));
          }
          toast.error(
            `${DEMO_SENTENCE_PREFIX} Item removed from your Wishlist.`
          );
        } catch (error) {
          console.error('Failed to remove from Wishlist:', error);
          toast.error('Failed to remove from Wishlist. Please try again.');
        } finally {
          // Set state to remove spinner animation
          set((state) => {
            const newSet = new Set(state.isToggling);
            newSet.delete(productId);
            return { isToggling: newSet };
          });
        }
      },

      // Return whether Product is in User Wishlist
      isProductInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      // LOUD RESET: If user is authenticated and demo mode is false, clear DB, else clear localStorage
      clearWishlist: async (isAuthenticated: boolean) => {
        if (isAuthenticated && !isDemoMode) {
          try {
            const response = await fetch('/api/user/wishlist/clear', {
              method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to clear Wishlist');

            set({ items: [] });
            toast.error('Removed all products from Wishlist');
          } catch (error) {
            console.error('Failed to clear Wishlist:', error);
            toast.error('Failed to clear Wishlist. Please try again.');
          }
        } else {
          // DEMO MODE NOTIFICATION
          if (isAuthenticated && isDemoMode) {
            console.log(
              `%c${DEMO_SENTENCE_PREFIX} Using local storage for authenticated user.\nRemove all Products from Wishlist.`,
              'color: #7c3aed'
            );
          }

          set({ items: [] });
          toast.error('Removed all products from wishlist.');
        }
      },

      // QUIET RESET: only clear localStorage, without toaster notifications
      _reset: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);

// Specific Wishlist Selectors
export const selectWishlistValue = (state: WishlistState) =>
  state.items.reduce(
    (total, item) =>
      total + (item.reducedPrice ? item.reducedPrice : item.price) * 1,
    0
  );

export const selectWishlistTotalItems = (state: WishlistState) =>
  state.items.length;

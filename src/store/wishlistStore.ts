import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@prisma/client';
import toast from 'react-hot-toast';

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const currentItems = get().items;
        const itemExists = currentItems.some((item) => item.id === product.id);

        if (!itemExists) {
          set((state) => ({
            items: [...state.items, product],
          }));
          toast.success(`${product.name} added to your Wishlist!`);
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
        toast.error(`Item removed from your Wishlist.`);
      },

      isProductInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectWishlistTotalItems = (state: WishlistState) =>
  state.items.length;

/**
 * @file Defines the Zustand store for managing the users Shopping Cart.
 * @description Allows the state management of the shopping Cart for users. Both on Database(DB) and localStorage
 * @see useCart.ts - The cart hook that provides a clean, component-friendly interface to this store.
 * @see CartWishlistSyncProvider.tsx - The provider that orchestrates syncing this store with the database on login.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductCardType } from '@/types/product';
import toast from 'react-hot-toast';

const MAX_QUANTITY = 100;

export interface CartItem extends ProductCardType {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  isAdding: Set<string>;
  isUpdating: Set<string>;

  // Actions
  addToCart: (
    product: ProductCardType,
    quantity: number,
    isAuthenticated?: boolean
  ) => Promise<void>;
  removeFromCart: (
    productId: string,
    isAuthenticated?: boolean
  ) => Promise<void>;
  updateQuantity: (
    productId: string,
    productName: string,
    quantity: number,
    isAuthenticated?: boolean
  ) => Promise<void>;
  clearCart: (isAuthenticated: boolean) => void;
  _reset: () => void;

  // Sync methods
  setItems: (items: CartItem[]) => void;
  loadFromDatabase: (userId: string) => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      isAdding: new Set(),
      isUpdating: new Set(),

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      setItems: (items: CartItem[]) => set({ items }),

      // Load cart from database for logged-in users
      loadFromDatabase: async (userId: string) => {
        try {
          const response = await fetch(`/api/user/cart`);

          if (!response.ok) throw new Error('Failed to load cart');

          const data = await response.json();

          set({ items: data.items });
        } catch (error) {
          console.error('Failed to load Cart from database:', error);
        }
      },

      // Add Product to Cart - Function for local and DB
      addToCart: async (
        product: ProductCardType,
        quantity: number,
        isAuthenticated = false
      ) => {
        const productId = product.id;

        if (get().isAdding.has(productId)) return;

        set((state) => ({ isAdding: new Set(state.isAdding).add(productId) }));

        try {
          const cart = get();
          const existingItem = cart.items.find(
            (item) => item.id === product.id
          );
          // Calculate new quantity
          const newQuantity = existingItem
            ? existingItem.quantity + quantity
            : quantity;

          // Enforce max limit
          if (newQuantity > MAX_QUANTITY) {
            toast.error(
              `Maximum order amount for ${product.name} is ${MAX_QUANTITY}`
            );
            return;
          }

          // If user is authenticated, add to DB, else add to localStorage
          if (isAuthenticated) {
            const response = await fetch('/api/user/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: product.id,
                quantity: quantity,
              }),
            });

            if (!response.ok) throw new Error('Failed to add to Cart');

            const data = await response.json();

            set({ items: data.items });
            toast.success(`${quantity} x ${product.name} added to Cart!`);
          } else {
            if (existingItem) {
              const updatedItems = cart.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              );
              set({ items: updatedItems });
            } else {
              set((state) => ({
                items: [...state.items, { ...product, quantity }],
              }));
            }
            toast.success(`${quantity} x ${product.name} added to Cart!`);
          }
        } catch (error) {
          console.error('Failed to add to Cart:', error);
          toast.error('Failed to add to Cart');
        } finally {
          // Set state to remove spinner animation
          set((state) => {
            const newSet = new Set(state.isAdding);
            newSet.delete(productId);
            return { isAdding: newSet };
          });
        }
      },

      // Remove Product from Cart - Function for local and DB
      removeFromCart: async (productId: string, isAuthenticated = false) => {
        const itemToRemove = get().items.find((item) => item.id === productId);

        // If user is authenticated, remove from DB, else from localStorage
        if (isAuthenticated) {
          try {
            const response = await fetch(`/api/user/cart/${productId}`, {
              method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to remove from Cart');

            const data = await response.json();

            set({ items: data.items });

            if (itemToRemove)
              toast.error(`${itemToRemove.name} removed from Cart.`);
          } catch (error) {
            console.error('Failed to remove from Cart:', error);
            toast.error('Failed to remove from Cart. Please try again.');
          }
        } else {
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }));

          if (itemToRemove)
            toast.error(`${itemToRemove.name} removed from Cart.`);
        }
      },

      // Update Product Quantity on DB or localStorage
      updateQuantity: async (
        productId: string,
        productName: string,
        quantity: number,
        isAuthenticated = false
      ) => {
        if (get().isUpdating.has(productId)) return;

        set((state) => ({
          isUpdating: new Set(state.isUpdating).add(productId),
        }));

        try {
          if (quantity > MAX_QUANTITY) {
            toast.error(
              `Maximum order amount for ${productName} is ${MAX_QUANTITY}`
            );
            return;
          }

          if (quantity < 1) {
            // Remove item if quantity is 0
            await get().removeFromCart(productId, isAuthenticated);
            return;
          }

          // If user is authenticated, update DB, else update localStorage
          if (isAuthenticated) {
            const response = await fetch('/api/user/cart', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId,
                quantity,
              }),
            });

            if (!response.ok) throw new Error('Failed to update quantity');

            const data = await response.json();
            set({ items: data.items });
          } else {
            set((state) => ({
              items: state.items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            }));
          }

          toast.success(`Updated ${productName} quantity.`);
        } catch (error) {
          console.error(`Failed to update ${productName} quantity:`, error);
          toast.error('Failed to update quantity. Please try again.');
        } finally {
          set((state) => {
            const newSet = new Set(state.isUpdating);
            newSet.delete(productId);
            return { isUpdating: newSet };
          });
        }
      },

      // LOUD RESET: If user is authenticated, clear DB, else clear localStorage
      clearCart: async (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          try {
            const response = await fetch('/api/user/cart/clear', {
              method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to clear Cart');

            set({ items: [] });
            toast.error('Removed all products from Cart.');
          } catch (error) {
            console.error('Failed to clear Cart:', error);
            toast.error('Failed to clear Cart. Please try again.');
          }
        } else {
          set({ items: [] });
          toast.error('Removed all products from Cart.');
        }
      },

      // QUIET RESET: only clear localStorage, without toaster notifications
      _reset: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);

// Specific Cart Selectors
export const selectCartTotal = (state: CartState) =>
  state.items.reduce(
    (total, item) =>
      total +
      (item.reducedPrice ? item.reducedPrice : item.price) * item.quantity,
    0
  );

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

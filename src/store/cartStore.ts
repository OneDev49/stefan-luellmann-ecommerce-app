import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductCardType } from '@/types/product';
import toast from 'react-hot-toast';

export interface CartItem extends ProductCardType {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: ProductCardType, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity) => {
        const cart = get();
        const existingItem = cart.items.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = cart.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
          toast.success(`${quantity} x ${product.name} added to cart!`);
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity }],
          }));
          toast.success(`${quantity} x ${product.name} added to cart!`);
        }
      },

      removeFromCart: (productId) => {
        const itemToRemove = get().items.find((item) => item.id === productId);
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));

        if (itemToRemove) {
          toast.error(`${itemToRemove.name} removed from cart.`);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

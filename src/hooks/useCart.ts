/**
 * @file Provides a clean, component-friendly interface for the cart store.
 * @description This file provides a clean direct way for interaction between the Zustand Cart store and components.
 * @see cartStore.ts - The cart Zustand store that provides the functions for this hook.
 */

import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { ProductCardType } from '@/types/product';

export function useCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const isAdding = useCartStore((state) => state.isAdding);
  const isUpdating = useCartStore((state) => state.isUpdating);
  const addToCartAction = useCartStore((state) => state.addToCart);
  const removeFromCartAction = useCartStore((state) => state.removeFromCart);
  const updateQuantityAction = useCartStore((state) => state.updateQuantity);
  const clearCartAction = useCartStore((state) => state.clearCart);

  return {
    items: items,
    isLoading: status === 'loading' || !isHydrated,
    isAdding,
    isUpdating,

    addToCart: (product: ProductCardType, quantity: number) =>
      addToCartAction(product, quantity, isAuthenticated),

    removeFromCart: (productId: string) =>
      removeFromCartAction(productId, isAuthenticated),

    updateQuantity: (
      productId: string,
      productName: string,
      quantity: number
    ) =>
      updateQuantityAction(productId, productName, quantity, isAuthenticated),

    clearCart: () => clearCartAction(isAuthenticated),
  };
}

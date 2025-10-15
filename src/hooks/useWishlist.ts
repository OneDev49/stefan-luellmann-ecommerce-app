/**
 * @file Provides a clean, component-friendly interface for the wishlist store.
 * @description This file provides a clean direct way for interaction between the Zustand Wishlist store and components.
 * @see wishlistStore.ts - The wishlist Zustand store that provides the functions for this hook.
 */

'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCardType } from '@/types/product';
import { useSession } from 'next-auth/react';

export function useWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const items = useWishlistStore((state) => state.items);
  const isHydrated = useWishlistStore((state) => state.isHydrated);
  const addToWishlistAction = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistAction = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isProductInWishlist = useWishlistStore(
    (state) => state.isProductInWishlist
  );
  const clearWishlistAction = useWishlistStore((state) => state.clearWishlist);

  return {
    items: items,
    isLoading: status === 'loading' || !isHydrated,

    isProductInWishlist: isProductInWishlist,

    addToWishlist: (product: ProductCardType) =>
      addToWishlistAction(product, isAuthenticated),

    removeFromWishlist: (productId: string) =>
      removeFromWishlistAction(productId, isAuthenticated),

    clearWishlist: () => clearWishlistAction(isAuthenticated),
  };
}

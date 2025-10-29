/**
 * @file Defines the CartWishlistSyncProvider component.
 * @description This provider is responsible for merging a guest's session data with their account upon login.
 * @see AuthProvider.tsx - Where this provider is rendered to wrap the application.
 * @see api/user/sync/route.ts - The backend API endpoint this provider calls.
 * @see cartStore.ts - The store that holds the guest cart data to be synced.
 * @see wishlistStore.ts - The store that holds the guest wishlist data to be synced.
 */

'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';

export function CartWishlistSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const hasSyncedThisSession = useRef(false);

  const isCartHydrated = useCartStore((state) => state.isHydrated);
  const isWishlistHydrated = useWishlistStore((state) => state.isHydrated);

  useEffect(() => {
    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} Skipping CartWishlistSyncProvider.`,
        'color: #7c3aed'
      );
      return;
    }

    if (status === 'authenticated') {
      if (isCartHydrated && isWishlistHydrated) {
        if (!hasSyncedThisSession.current) {
          hasSyncedThisSession.current = true;

          console.log(
            'Authenicated session detected. Checking for guest data to sync...'
          );
          syncLocalStorageToDatabase();
        }
      }
    }

    if (status === 'unauthenticated') {
      hasSyncedThisSession.current = false;
    }
  }, [status, isCartHydrated, isWishlistHydrated]);

  const syncLocalStorageToDatabase = async () => {
    const cartStore = useCartStore.getState();
    const wishlistStore = useWishlistStore.getState();

    const localCart = cartStore.items;
    const localWishlist = wishlistStore.items;

    if (localCart.length === 0 && localWishlist.length === 0) {
      console.log('No guest data found. Sync skipped');
      return;
    }

    console.log('Guest data found. Syncing to database...', {
      cart: localCart.length,
      wishlist: localWishlist.length,
    });

    try {
      const syncData = {
        cart: localCart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        wishlist: localWishlist.map((item) => item.id),
      };

      const response = await fetch('/api/user/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syncData),
      });

      if (!response.ok) throw new Error('Sync API request failed');

      const result = await response.json();
      console.log('Sync successful. Updating client state with merged data');

      // silent clear after successful sync to clear old guest data
      cartStore._reset();
      wishlistStore._reset();

      // immediately populate the stores with the merged data from the server
      cartStore.setItems(result.cart);
      wishlistStore.setItems(result.wishlist);
    } catch (error) {
      console.error('Failed to sync guest data:', error);
    }
  };

  return <>{children}</>;
}

/**
 * @file Defines the AuthenticatedStateLoader component
 * @description This components responsibility is to sync the client-side state with the DB for authenticated users.
 * @see AuthProvider.tsx - Where this component is rendered to wrap the application.
 * @see cartStore.ts - The Zustand store this component loads data into.
 * @see wishlistStore.ts - The Zustand store this component loads data into.
 */

'use client';

import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export function AuthenticatedStateLoader() {
  const { data: session, status } = useSession();
  const { loadFromDatabase: loadCart, isHydrated: isCartHydrated } =
    useCartStore();
  const { loadFromDatabase: loadWishlist, isHydrated: isWishlistHydrated } =
    useWishlistStore();
  const hasLoadedDbState = useRef(false);

  useEffect(() => {
    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} Skipping AuthenticatedStateLoader.`,
        'color: #7c3aed'
      );
      return;
    }

    if (
      status === 'authenticated' &&
      isCartHydrated &&
      isWishlistHydrated &&
      !hasLoadedDbState.current
    ) {
      hasLoadedDbState.current = true;

      console.log(
        'Authenticated user detected. Loading state from database...'
      );

      if (session?.user?.id) {
        loadCart(session.user.id);
        loadWishlist(session.user.id);
      }
    } else if (status === 'unauthenticated') {
      hasLoadedDbState.current = false;
    }
  }, [
    status,
    session,
    isCartHydrated,
    isWishlistHydrated,
    loadCart,
    loadWishlist,
  ]);

  return null;
}

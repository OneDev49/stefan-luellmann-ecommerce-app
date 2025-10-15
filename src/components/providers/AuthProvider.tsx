/**
 * @file Defines the root authentication and state management provider for the application.
 * @description This AuthProvider is a central hub for user authentication and related client-side state
 * @see app/layout.tsx - Where this provider is implemented to wrap the entire application.
 * @see AuthenticatedStateLoader.tsx - A child provider responsible for loading DB state.
 * @see CartWishlistSyncProvider.tsx - A child provider responsible for syncing guest data.
 */

'use client';
import { SessionProvider } from 'next-auth/react';
import { CartWishlistSyncProvider } from './CartWishlistSyncProvider';
import { AuthenticatedStateLoader } from './AuthenticatedStateLoader';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthenticatedStateLoader />
      <CartWishlistSyncProvider>{children}</CartWishlistSyncProvider>
    </SessionProvider>
  );
}

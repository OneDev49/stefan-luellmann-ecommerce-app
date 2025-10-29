'use client';

import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { signOut } from 'next-auth/react';

import toast from 'react-hot-toast';

interface LogoutButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const LogoutButton = ({ className, children }: LogoutButtonProps) => {
  const resetCart = useCartStore.getState()._reset;
  const resetWishlist = useWishlistStore.getState()._reset;

  const handleLogout = async () => {
    // DEMO MODE
    if (isDemoMode) {
      toast.success(`${DEMO_SENTENCE_PREFIX} You've been logged out.`);
      await signOut({ callbackUrl: '/' });
    }

    resetCart();
    resetWishlist();

    toast.success("You've been logged out.");

    await signOut({ callbackUrl: '/' });
  };

  return (
    <button type='button' className={className || ''} onClick={handleLogout}>
      {children}
    </button>
  );
};

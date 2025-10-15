'use client';

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

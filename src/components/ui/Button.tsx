import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  position?: 'card' | 'section';
  children: React.ReactNode;
  className?: string;
}

type ButtonProps<C extends React.ElementType> = ButtonBaseProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps>;

export default function Button<C extends React.ElementType = typeof Link>({
  as,
  variant = 'primary',
  position = 'card',
  children,
  className,
  ...restProps
}: ButtonProps<C>) {
  const Component = as || Link;

  const buttonClassNames = clsx(
    'transition-all',
    'hover:scale-[1.02]',
    'flex',
    'flex-row',
    'gap-2',
    'items-center',
    {
      [`bg-[linear-gradient(90deg,#fe9043,#ff6c06)] text-black hover:bg-[linear-gradient(90deg,#ffa769,#ff7a1d)]`]:
        variant === 'primary',
      [`bg-[linear-gradient(90deg,#06480a,#0e8e17)] shadow-[0_4px_4px_0_rgba(0,255,68,0.4)] hover:bg-[linear-gradient(90deg,#075d0c,#0ca816)]`]:
        variant === 'secondary',
      [`bg-[rgba(0,0,0,0.4)] border border-white shadow-[0_4px_4px_0_rgba(255,255,255,0.5)] hover:bg-[rgba(0,0,0,1)]`]:
        variant === 'tertiary',
    },
    {
      ['p-[12px_18px] rounded-2xl']: position === 'section',
      ['p-[8px_12px] rounded-lg']: position === 'card',
    }
  );

  return (
    <Component
      className={`${buttonClassNames} ${className || ''}`}
      {...(restProps as any)}
    >
      {children}
    </Component>
  );
}

import React from 'react';
import clsx from 'clsx';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'free';
  position?: 'card' | 'section' | 'standalone';
  children: React.ReactNode;
  className?: string;
}

type ButtonProps<C extends React.ElementType> = ButtonBaseProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps>;

function Button<C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  position = 'card',
  children,
  className,
  ...restProps
}: ButtonProps<C>) {
  const Component = (as || 'button') as React.ElementType;

  const buttonClassNames = clsx(
    'transition-all hover:scale-[1.02] flex flex-row gap-2 items-center',
    {
      [`bg-[linear-gradient(90deg,#fe9043,#ff6c06)] text-black hover:bg-[linear-gradient(90deg,#ffa769,#ff7a1d)]`]:
        variant === 'primary',
      [`bg-[linear-gradient(90deg,#06480a,#0e8e17)] shadow-[0_4px_4px_0_rgba(0,255,68,0.4)] hover:bg-[linear-gradient(90deg,#075d0c,#0ca816)]`]:
        variant === 'secondary',
      [`bg-[rgba(0,0,0,0.4)] border border-white shadow-[0_4px_4px_0_rgba(255,255,255,0.5)] hover:bg-[rgba(0,0,0,1)]`]:
        variant === 'tertiary',
      ['bg-[#ba1616] shadow-[0_4px_4px_0_rgba(172,0,0,0.5)] hover:bg-[#e41818]']:
        variant === 'danger',
    },
    {
      ['p-[12px_18px] rounded-2xl']: position === 'section',
      ['py-1 px-2 rounded-lg']: position === 'card',
      ['']: position === 'standalone',
    }
  );

  const finalClassName =
    variant === 'free'
      ? className || ''
      : `${buttonClassNames} ${className || ''}`;

  // Type assertion needed for polymorphic components
  const props = {
    className: finalClassName,
    ...restProps,
  } as React.ComponentPropsWithRef<C>;

  return React.createElement(Component, props, children);
}

export default Button;

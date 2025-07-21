import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'terciary';
  children: React.ReactNode;
  className?: string;
}

type ButtonProps<C extends React.ElementType> = ButtonBaseProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps>;

export default function Button<C extends React.ElementType = typeof Link>({
  as,
  variant = 'primary',
  children,
  className,
  ...restProps
}: ButtonProps<C>) {
  const Component = as || Link;

  return (
    <Component className={className} {...(restProps as any)}>
      {children}
    </Component>
  );
}

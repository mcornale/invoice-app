import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import type { ReactNode } from 'react';

interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  children: ReactNode;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({
  children,
  className,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={`popover-content ${className ?? ''}`}
        sideOffset={8}
        align='start'
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

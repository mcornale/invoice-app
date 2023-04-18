import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { forwardRef } from 'react';

interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {}

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

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={`popover-content ${className ?? ''}`}
          sideOffset={8}
          align='start'
          {...props}
          ref={ref}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';

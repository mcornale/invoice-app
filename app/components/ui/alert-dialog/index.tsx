import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import type { LinksFunction } from '@remix-run/node';
import { forwardRef } from 'react';
import styles from './styles.css';

export interface AlertDialogContentProps
  extends AlertDialogPrimitive.AlertDialogContentProps {
  title: string;
  description: string;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ children, title, description, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className='alert-dialog-overlay' />
      <AlertDialogPrimitive.Content
        className='alert-dialog-content'
        aria-describedby={undefined}
        {...props}
        ref={ref}
      >
        <AlertDialogPrimitive.Title className='alert-dialog-title'>
          {title}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className='alert-dialog-description'>
          {description}
        </AlertDialogPrimitive.Description>
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

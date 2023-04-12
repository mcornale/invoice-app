import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';

interface AlertDialogContentProps
  extends RadixAlertDialog.AlertDialogContentProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const AlertDialog = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;
export const AlertDialogAction = RadixAlertDialog.Action;
export const AlertDialogCancel = RadixAlertDialog.Cancel;

export function AlertDialogContent({
  children,
  title,
  description,
  ...props
}: AlertDialogContentProps) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className='alert-dialog-overlay' />
      <RadixAlertDialog.Content
        className='alert-dialog-content'
        aria-describedby={undefined}
        {...props}
      >
        <RadixAlertDialog.Title className='alert-dialog-title'>
          {title}
        </RadixAlertDialog.Title>
        <RadixAlertDialog.Description className='alert-dialog-description'>
          {description}
        </RadixAlertDialog.Description>
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
}

import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { ReactNode } from 'react';

interface SlideOverProps {
  open: Dialog.DialogProps['open'];
  onOpenChange: Dialog.DialogProps['onOpenChange'];
  container: Dialog.DialogPortalProps['container'];
  children: ReactNode;
  title: string;
  description: string;
}

export function SlideOver({
  open,
  onOpenChange,
  container,
  children,
  title,
  description,
}: SlideOverProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className='slide-over-overlay' />
        <Dialog.Content className='slide-over-content'>
          <div className='slide-over-top-bar'>
            <Dialog.Title>{title}</Dialog.Title>
          </div>
          <VisuallyHidden.Root asChild>
            <Dialog.Description>{description}</Dialog.Description>
          </VisuallyHidden.Root>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const SlideOverClose = Dialog.Close;

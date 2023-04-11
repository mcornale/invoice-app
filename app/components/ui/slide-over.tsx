import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

interface SlideOverContentProps extends Dialog.DialogContentProps {
  children: ReactNode;
  title: string;
}

export const SlideOver = Dialog.Root;
export const SlideOverTrigger = Dialog.Trigger;
export const SlideOverClose = Dialog.Close;

export function SlideOverContent({
  children,
  title,
  ...props
}: SlideOverContentProps) {
  const [container, setContainer] = useState<HTMLElement | null>();

  useEffect(() => {
    setContainer(document.querySelector('main') as HTMLElement);
  }, []);

  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay className='slide-over-overlay' {...props} />
      <Dialog.Content
        className='slide-over-content'
        aria-describedby={undefined}
        {...props}
      >
        <Dialog.Title className='slide-over-title'>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

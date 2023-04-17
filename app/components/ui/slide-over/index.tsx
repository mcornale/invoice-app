import * as Dialog from '@radix-ui/react-dialog';
import type { LinksFunction } from '@remix-run/node';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './styles.css';

interface SlideOverContentProps extends Dialog.DialogContentProps {
  children: ReactNode;
  title: string;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const SlideOver = Dialog.Root;
export const SlideOverTrigger = Dialog.Trigger;
export const SlideOverClose = Dialog.Close;

export const SlideOverContent = forwardRef<
  HTMLDivElement,
  SlideOverContentProps
>(({ children, title, ...props }, ref) => {
  const [container, setContainer] = useState<HTMLElement | null>();

  useEffect(() => {
    setContainer(document.querySelector('main') as HTMLElement);
  }, []);

  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay className='slide-over-overlay' />
      <Dialog.Content
        className='slide-over-content'
        aria-describedby={undefined}
        {...props}
        ref={ref}
      >
        <Dialog.Title className='slide-over-title'>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
});
SlideOverContent.displayName = 'SlideOverContent';

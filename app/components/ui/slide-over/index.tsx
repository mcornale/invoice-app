import * as Dialog from '@radix-ui/react-dialog';
import type { LinksFunction } from '@remix-run/node';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './styles.css';

export interface SlideOverContentProps extends Dialog.DialogContentProps {
  title: string;
}
export interface SlideOverProps extends Omit<Dialog.DialogProps, 'modal'> {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const SlideOver = ({ ...props }: SlideOverProps) => {
  return <Dialog.Root modal={false} {...props} />;
};

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
      <div className='slide-over-overlay' aria-hidden />
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

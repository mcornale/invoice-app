import * as Dialog from '@radix-ui/react-dialog';
import type { LinksFunction } from 'react-router';
import { forwardRef, useEffect, useState } from 'react';
import styles from './styles.css?url';

export interface SlideOverContentProps
  extends Omit<Dialog.DialogContentProps, 'onInteractOutside'> {
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

  const handleOnInteractOutside = (
    event: CustomEvent
  ) => {
    const appHeader = document.querySelector('.app-header');
    if (appHeader?.contains(event.target as HTMLElement)) {
      event.preventDefault();
    }
  };

  return (
    <Dialog.Portal container={container}>
      <div className='slide-over-overlay' aria-hidden />
      <Dialog.Content
        className='slide-over-content'
        aria-describedby={undefined}
        onInteractOutside={handleOnInteractOutside}
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

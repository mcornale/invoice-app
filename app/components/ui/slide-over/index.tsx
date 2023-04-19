import * as Dialog from '@radix-ui/react-dialog';
import type { LinksFunction } from '@remix-run/node';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './styles.css';
import { useNavigate } from '@remix-run/react';
import type { DialogContentProps } from '@radix-ui/react-alert-dialog';

export interface SlideOverContentProps
  extends Omit<Dialog.DialogContentProps, 'onInteractOutside'> {
  title: string;
}
export interface SlideOverProps
  extends Omit<Dialog.DialogProps, 'open' | 'onOpenChange' | 'modal'> {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const SlideOver = ({ ...props }: SlideOverProps) => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(true);
  }, []);

  function handleOpenChange(open: boolean) {
    if (!open) navigate(-1);
  }

  return (
    <Dialog.Root
      open={navOpen}
      onOpenChange={handleOpenChange}
      modal={false}
      {...props}
    />
  );
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

  const handleOnInteractOutside: DialogContentProps['onInteractOutside'] = (
    event
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

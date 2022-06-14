import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

type Props = {
  children: ReactNode;
  hideSideBar?: boolean;
};

const Modal = (props: Props) => {
  const { children, hideSideBar } = props;

  const modalClassNameArr = [styles.modal];
  if (hideSideBar) modalClassNameArr.push(styles.modalHideSideBar);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div className={modalClassNameArr.join(' ')}>
      {children}
      <div className={styles.modalBackdrop}></div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;

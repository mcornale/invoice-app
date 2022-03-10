import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const Modal = (props) => {
  const { children } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <>
      {children}
      <div className={styles.modalBackdrop}></div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;

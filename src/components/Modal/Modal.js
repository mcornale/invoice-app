import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const Modal = (props) => {
  const { children } = props;
  return createPortal(
    <>
      {children}
      <div className={styles.modalBackdrop}></div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;

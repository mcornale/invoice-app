import { ReactNode } from 'react';
import styles from './Container.module.css';

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default Container;

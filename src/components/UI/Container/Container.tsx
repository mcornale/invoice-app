import { ReactNode } from 'react';
import styles from './Container.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = (props: Props) => {
  const { children, className } = props;

  const containerClassName = [styles.container];
  if (className) containerClassName.push(className);

  return <div className={containerClassName.join(' ')}>{children}</div>;
};

export default Container;

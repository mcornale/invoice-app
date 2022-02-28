import styles from './Container.module.css';

const Container = (props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default Container;

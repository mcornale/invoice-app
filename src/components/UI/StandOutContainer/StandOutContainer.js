import styles from './StandOutContainer.module.css';

const StandOutContainer = (props) => {
  const { children } = props;

  return <div className={styles.standOutContainer}>{children}</div>;
};

export default StandOutContainer;

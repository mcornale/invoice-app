import styles from './Filter.module.css';
import arrowSrc from '../../assets/icons/icon-arrow-down.svg';

const Filter = () => {
  return (
    <div className={styles.filter}>
      <p className={styles.filterText}>Filter by status</p>
      <img
        className={styles.filterIcon}
        src={arrowSrc}
        alt='open filter options'
      />
    </div>
  );
};

export default Filter;

import Icon from '../Icon';
import styles from './Filter.module.css';

const Filter = () => {
  return (
    <div className={styles.filter}>
      <p className={styles.filterText}>Filter by status</p>
      <Icon icon='arrowDown' />
    </div>
  );
};

export default Filter;

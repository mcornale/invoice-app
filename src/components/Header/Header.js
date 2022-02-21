import Filter from '../Filter/Filter';
import Button from '../Button/Button';

import styles from './Header.module.css';
import Icon from '../Icon/Icon';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>
      <div className={styles.headerActions}>
        <Filter />
        <Button
          text='New Invoice'
          icon={<Icon icon='plus' />}
          buttonStyle='1'
        />
      </div>
    </header>
  );
};

export default Header;

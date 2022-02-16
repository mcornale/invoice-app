import Filter from '../Filter/Filter';
import Button from '../UI/Button/Button';

import plusIconSrc from '../../assets/icons/icon-plus.svg';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>
      <div className={styles.headerActions}>
        <Filter />
        <Button text='New Invoice' iconSrc={plusIconSrc} buttonStyle='1' />
      </div>
    </header>
  );
};

export default Header;

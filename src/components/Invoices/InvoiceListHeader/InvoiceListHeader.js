import Filter from '../../UI/Filter/Filter';
import Button from '../../UI/Button/Button';

import styles from './InvoiceListHeader.module.css';
import Icon from '../../UI/Icon';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InvoiceListHeader = () => {
  const invoicesCount = useSelector(
    (state) => state.invoices.invoiceList?.length
  );

  return (
    <header className={styles.header}>
      <div>
        <h1>Invoices</h1>
        <p>There are {invoicesCount} total invoices</p>
      </div>
      <div className={styles.headerActions}>
        <Filter />
        <Link to='new'>
          <Button icon={<Icon icon='plus' />} buttonStyle='1'>
            New Invoice
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default InvoiceListHeader;

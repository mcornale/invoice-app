import MultiCheckBox from '../../UI/MultiCheckBox/MultiCheckBox';
import Button from '../../UI/Button/Button';

import styles from './InvoiceListHeader.module.css';
import Icon from '../../UI/Icon';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import INVOICES_STATUSES from '../../../constants/invoices-statuses';
import { useDispatch } from 'react-redux';
import { setInvoiceListFilters } from '../../../store/invoicesSlice';

const InvoiceListHeader = () => {
  const invoiceListFilters = useAppSelector(
    (state) => state.invoices.invoiceListFilters
  );
  const invoicesCount = useAppSelector(
    (state) => state.invoices.invoiceList?.length
  );
  const dispatch = useDispatch();

  const invoiceListFiltersOptions = Object.values(INVOICES_STATUSES);

  const handleMultiCheckBoxChange = (optionClicked: string) => {
    const newInvoiceListFilters = invoiceListFilters.includes(optionClicked)
      ? invoiceListFilters.filter((option) => option !== optionClicked)
      : [...invoiceListFilters, optionClicked];

    dispatch(setInvoiceListFilters({ newInvoiceListFilters }));
  };

  return (
    <header className={styles.header}>
      <div>
        <h1>Invoices</h1>
        <p>There are {invoicesCount} total invoices</p>
      </div>
      <div className={styles.headerActions}>
        <MultiCheckBox
          options={invoiceListFiltersOptions}
          activeOptions={invoiceListFilters}
          onChange={handleMultiCheckBoxChange}
        />
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

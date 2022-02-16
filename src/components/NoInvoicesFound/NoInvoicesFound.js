import styles from './NoInvoicesFound.module.css';

import emptyIllustrationSrc from '../../assets/images/illustration-empty.svg';

const NoInvoicesFound = () => {
  return (
    <section className={styles.noInvoicesFound}>
      <img src={emptyIllustrationSrc} alt='' />
      <h2 className={styles.noInvoicesFoundTitle}>There is nothing here</h2>
      <p>
        Create an invoice by clicking the
        <br />
        <strong>New Invoice</strong> button and get started
      </p>
    </section>
  );
};

export default NoInvoicesFound;

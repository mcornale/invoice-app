import logoImgSrc from '../assets/images/logo.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img className={styles.logoImg} src={logoImgSrc} alt='invoice app logo' />
    </div>
  );
};

export default Logo;

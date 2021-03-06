import logoImgSrc from '../../../assets/images/logo.svg';
import profileImgSrc from '../../../assets/images/image-avatar.jpg';
import styles from './SideBar.module.css';
import Icon from '../../UI/Icon';
import { useState } from 'react';
import Button from '../../UI/Button/Button';

const Sidebar = () => {
  const [theme, setTheme] = useState(document.body.dataset.theme);

  const handleChangeThemeBtn = () => {
    document.body.dataset.theme =
      document.body.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(document.body.dataset.theme);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <img
          className={styles.sidebarLogoImg}
          src={logoImgSrc}
          alt='invoice app logo'
        />
      </div>
      <div className={styles.sidebarElements}>
        <Button
          className={styles.sidebarChangeThemeIcon}
          onClick={handleChangeThemeBtn}
          icon={<Icon icon={theme === 'light' ? 'moon' : 'sun'} />}
        />
        <img
          className={styles.sidebarProfileImg}
          src={profileImgSrc}
          alt='user profile'
        />
      </div>
    </aside>
  );
};

export default Sidebar;

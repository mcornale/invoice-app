import logoImgSrc from '../../../assets/images/logo.svg';
import profileImgSrc from '../../../assets/images/image-avatar.jpg';
import styles from './SideBar.module.css';
import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';

const Sidebar = () => {
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
        <button className={styles.sidebarThemeSwitch}>
          <Icon icon='moon' />
        </button>
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

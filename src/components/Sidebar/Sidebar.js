import Logo from '../Logo/Logo';
import profileImgSrc from '../../assets/images/image-avatar.jpg';
import darkModeIconSrc from '../../assets/icons/icon-moon.svg';
import styles from './SideBar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <div className={styles.sidebarElements}>
        <button className={styles.sidebarThemeSwitch}>
          <img src={darkModeIconSrc} alt='user profile' />
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

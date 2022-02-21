import Logo from '../Logo/Logo';
import profileImgSrc from '../../assets/images/image-avatar.jpg';
import styles from './SideBar.module.css';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <div className={styles.sidebarElements}>
        <Button icon={<Icon icon='moon' />} />
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

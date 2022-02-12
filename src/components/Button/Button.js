import styles from './Button.module.css';

const Button = (props) => {
  const { text, iconSrc, buttonStyle } = props;

  let buttonClassName = [styles.button];

  switch (buttonStyle) {
    case '1':
      buttonClassName.push(styles.button1);
      break;
    default:
      break;
  }

  return (
    <button className={buttonClassName.join(' ')}>
      {iconSrc && <img className={styles.buttonIcon} src={iconSrc} alt='' />}
      {text}
    </button>
  );
};

export default Button;

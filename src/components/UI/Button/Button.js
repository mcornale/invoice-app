import styles from './Button.module.css';

const Button = (props) => {
  const { text, iconSrc, buttonStyle } = props;

  let buttonClassName = [styles.button];

  switch (buttonStyle) {
    case '1':
      if (iconSrc) buttonClassName.push(styles.button1WithIcon);
      buttonClassName.push(styles.button1);
      break;
    case '2':
      buttonClassName.push(styles.button2);
      break;
    case '3':
      buttonClassName.push(styles.button3);
      break;
    case '4':
      buttonClassName.push(styles.button4);
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

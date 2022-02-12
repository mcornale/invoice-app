import styles from './Button.module.css';

const Button = (props) => {
  const { text, iconSrc, buttonStyle } = props;

  let buttonClassName = '';

  switch (buttonStyle) {
    case '1':
      buttonClassName = styles.button1;
      break;
    default:
      break;
  }

  return (
    <button className={buttonClassName}>
      {iconSrc && <img className={styles.buttonIcon} src={iconSrc} alt='' />}
      {text}
    </button>
  );
};

export default Button;

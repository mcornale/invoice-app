import styles from './Button.module.css';

const Button = (props) => {
  const { text, icon, buttonStyle, onClick } = props;

  const buttonClassName = [styles.button];

  if (icon) buttonClassName.push(styles.buttonWithIcon);

  switch (buttonStyle) {
    case '1':
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
      buttonClassName.push(styles.buttonDefault);
      break;
  }

  return (
    <button onClick={onClick} className={buttonClassName.join(' ')}>
      {icon}
      {text}
    </button>
  );
};

export default Button;

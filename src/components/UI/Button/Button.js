import styles from './Button.module.css';

const Button = (props) => {
  const { children, icon, buttonStyle, onClick, style, className } = props;

  const buttonClassName = [styles.button];

  if (className) buttonClassName.push(className);

  if (buttonStyle === '1') buttonClassName.push(styles.button1);
  if (buttonStyle === '2') buttonClassName.push(styles.button2);
  if (buttonStyle === '3') buttonClassName.push(styles.button3);
  if (buttonStyle === '4') buttonClassName.push(styles.button4);

  if (icon) buttonClassName.push(styles.buttonWithIcon);

  return (
    <button
      type='button'
      style={style}
      onClick={onClick}
      className={buttonClassName.join(' ')}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;

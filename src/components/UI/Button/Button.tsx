import { ReactNode } from 'react';
import styles from './Button.module.css';

type Props = {
  children?: ReactNode;
  icon?: JSX.Element;
  buttonStyle?: '1' | '2' | '3' | '4';
  onClick?: () => void;
  className?: string;
};

const Button = (props: Props) => {
  const { children, icon, buttonStyle, onClick, className } = props;

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
      onClick={onClick}
      className={buttonClassName.join(' ')}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;

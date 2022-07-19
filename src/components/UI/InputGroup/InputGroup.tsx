import InputText from '../InputText';
import styles from './InputGroup.module.css';
import InputDate from '../InputDate/InputDate';
import Select from '../Select/Select';
import INPUT_TYPES from '../../../constants/input-types';

type Props = {
  label: string;
  type: string;
  value: string;
  onChange?: (newValue: string) => void;
  noLabel?: boolean;
  readOnly?: boolean;
  options?: number[];
  disabled?: boolean;
  placeholder?: string;
  isErrorVisible?: boolean;
};

const InputGroup = (props: Props) => {
  const {
    label,
    type,
    value,
    onChange,
    noLabel,
    readOnly,
    options,
    disabled,
    placeholder,
  } = props;

  const inputFieldClassName = [styles.inputField];
  if (readOnly) inputFieldClassName.push(styles.inputFieldReadOnly);

  const inputGroupClassName = [styles.inputGroup];
  if (disabled) inputGroupClassName.push(styles.inputGroupDisabled);

  return (
    <div className={inputGroupClassName.join(' ')}>
      {!noLabel && <label>{label}</label>}
      {(type === INPUT_TYPES.TEXT ||
        type === INPUT_TYPES.EMAIL ||
        type === INPUT_TYPES.PRICE ||
        type === INPUT_TYPES.QUANTITY) && (
        <InputText
          className={inputFieldClassName.join(' ')}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          {...(placeholder && { placeholder })}
        />
      )}
      {type === INPUT_TYPES.DATE && (
        <InputDate
          className={inputFieldClassName.join(' ')}
          value={value}
          onChange={onChange!}
          disabled={disabled ?? false}
        />
      )}
      {type === INPUT_TYPES.SELECT && (
        <Select
          className={inputFieldClassName.join(' ')}
          value={value}
          onChange={onChange!}
          options={options!}
        />
      )}
    </div>
  );
};

export default InputGroup;

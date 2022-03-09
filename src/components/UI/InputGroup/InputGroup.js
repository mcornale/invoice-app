import InputText from '../InputText';
import styles from './InputGroup.module.css';
import InputDate from '../InputDate/InputDate';
import Select from '../Select/Select';

const InputGroup = (props) => {
  const { label, type, value, onChange, noLabel, readOnly, options, disabled } =
    props;

  const inputFieldClassName = [styles.inputField];
  if (readOnly) inputFieldClassName.push(styles.inputFieldReadOnly);

  const inputGroupClassName = [styles.inputGroup];
  if (disabled) inputGroupClassName.push(styles.inputGroupDisabled);

  return (
    <div className={inputGroupClassName.join(' ')}>
      {!noLabel && <label>{label}</label>}
      {(type === 'text' ||
        type === 'email' ||
        type === 'price' ||
        type === 'quantity') && (
        <InputText
          className={inputFieldClassName.join(' ')}
          type={type}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
      )}
      {type === 'date' && (
        <InputDate
          className={inputFieldClassName.join(' ')}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {type === 'select' && (
        <Select
          className={inputFieldClassName.join(' ')}
          value={value}
          onChange={onChange}
          options={options}
        />
      )}
    </div>
  );
};

export default InputGroup;

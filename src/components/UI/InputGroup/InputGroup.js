import InputText from '../InputText';
import styles from './InputGroup.module.css';
import InputDate from '../InputDate/InputDate';
import formatTotal from '../../../helpers/formatTotal';
import Select from '../Select/Select';

const InputGroup = (props) => {
  const { label, type, value, noLabel, readOnly, options } = props;

  const inputFieldClassName = [styles.inputField];
  if (readOnly) inputFieldClassName.push(styles.inputFieldReadOnly);

  let isOkToUpdateInputText;
  let formatInputText;

  if (type === 'price') {
    isOkToUpdateInputText = (inputValue) =>
      !isNaN(inputValue.split(',').join(''));
    formatInputText = (inputValue) =>
      formatTotal(inputValue.toString().split(',').join('')).slice(2);
  }

  if (type === 'quantity') {
    isOkToUpdateInputText = (inputValue) =>
      inputValue.length <= 2 && Number.isInteger(Number(inputValue));
    formatInputText = (inputValue) => Number(inputValue).toString();
  }

  return (
    <div className={styles.inputGroup}>
      {!noLabel && <label>{label}</label>}
      {(type === 'text' ||
        type === 'email' ||
        type === 'price' ||
        type === 'quantity') && (
        <InputText
          className={inputFieldClassName.join(' ')}
          value={value}
          isOkToUpdateInputText={isOkToUpdateInputText}
          formatInputText={formatInputText}
        />
      )}
      {type === 'date' && (
        <InputDate
          className={inputFieldClassName.join(' ')}
          value={value}
          readOnly={readOnly}
        />
      )}
      {type === 'select' && (
        <Select
          className={inputFieldClassName.join(' ')}
          value={value}
          options={options}
        />
      )}
    </div>
  );
};

export default InputGroup;

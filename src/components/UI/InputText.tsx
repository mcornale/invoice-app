import { FormEvent } from 'react';

type Props = {
  value: string;
  onChange?: (newValue: string) => void;
  className: string;
  readOnly?: boolean;
};

const InputText = (props: Props) => {
  const { value, onChange, className, readOnly } = props;

  const handleInputTextChange = (event: FormEvent<HTMLInputElement>) => {
    if (onChange) onChange.call(null, (event.target as HTMLInputElement).value);
  };

  return (
    <input
      type='text'
      className={className}
      value={value}
      onChange={handleInputTextChange}
      readOnly={readOnly ?? false}
    />
  );
};

export default InputText;

import { FormEvent } from 'react';

type Props = {
  value: string;
  onChange?: (newValue: string) => void;
  className: string;
  readOnly?: boolean;
  placeholder?: string;
};

const InputText = (props: Props) => {
  const { value, onChange, className, readOnly, placeholder } = props;

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
      {...(placeholder && { placeholder })}
    />
  );
};

export default InputText;

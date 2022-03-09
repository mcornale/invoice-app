const InputText = (props) => {
  const { value, onChange, className, readOnly } = props;

  const handleInputTextChange = (event) => {
    onChange.call(null, event.target.value);
  };

  return (
    <input
      type='text'
      className={className}
      value={value}
      onChange={handleInputTextChange}
      readOnly={readOnly}
    />
  );
};

export default InputText;

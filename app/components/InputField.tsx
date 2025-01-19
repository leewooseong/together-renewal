interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  isPassword?: boolean;
}

function InputField({
  label,
  name,
  placeholder = '',
  value,
  onChange,
  errorMessage = '',
  isPassword = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full border px-3 py-2 ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 ${
          errorMessage ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

InputField.defaultProps = {
  placeholder: '',
  errorMessage: '',
  isPassword: false,
};

export default InputField;

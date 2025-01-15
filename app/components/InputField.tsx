import {Controller} from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  control: any;
  errorMessage?: string;
  isPassword?: boolean;
}

const InputField = ({
  label,
  name,
  placeholder,
  control,
  errorMessage,
  isPassword = false,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={isPassword ? "password" : "text"}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border ${
              errorMessage ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errorMessage ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
        )}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default InputField;

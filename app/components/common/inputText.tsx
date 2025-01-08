export function InputTextBox({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      className="w-full h-[120px] resize-none overflow-auto bg-gray-50 rounded-md font-medium text-sm mt-[12px] p-[10px]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

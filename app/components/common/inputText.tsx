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
      className="mt-[12px] h-[120px] w-full resize-none overflow-auto rounded-md bg-gray-50 p-[10px] text-sm font-medium"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

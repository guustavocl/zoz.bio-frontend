type LabelInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  size?: number;
  minSize?: number;
  value: string;
  bgColor?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

export default function LabelInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  disabled = false,
  autoComplete = "off",
  errors,
  value,
  size,
  minSize,
  bgColor = "bg-tertiary",
  onChange,
  onBlur,
}: LabelInputProps) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          errors
            ? "text-red-700 group-focus-within:text-red-700"
            : "text-gray-300 group-focus-within:text-violet-500"
        }`}
      >
        {errors ? errors : label}
      </label>
      {size && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium ${
            errors
              ? "text-red-800 group-focus:text-red-800"
              : "text-gray-400 group-focus:text-violet-600"
          } absolute right-2.5 top-0`}
        >
          {`${
            minSize && minSize > value.length ? minSize : value.length
          }/${size}`}
        </label>
      )}
      <div className="relative mt-1 rounded-md">
        <input
          className={
            "w-full block rounded-md text-lg font-medium pl-2 pr-2 py-1 " +
            `${bgColor} border-zblack ring-zblack ` +
            "focus:border-violet-600 focus:ring-violet-500 " +
            `${disabled ? "text-gray-600" : "text-gray-200"}`
          }
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          maxLength={size ? size : undefined}
          onChange={(e) => {
            if (onBlur) onBlur(e);
            onChange(e);
          }}
          onBlur={onBlur}
          placeholder=""
          disabled={disabled}
        />
      </div>
    </div>
  );
}

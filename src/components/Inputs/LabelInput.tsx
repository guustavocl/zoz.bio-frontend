type LabelInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errors?: string;
  size?: number;
  minSize?: number;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

export default function LabelInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete = "off",
  errors,
  value,
  size,
  minSize,
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
            : "text-gray-500 group-focus-within:text-violet-500"
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
              : "text-gray-600 group-focus:text-violet-600"
          } absolute right-2.5 top-0`}
        >
          {`${
            minSize && minSize > value.length ? minSize : value.length
          }/${size}`}
        </label>
      )}
      <div className="relative mt-1 rounded-md">
        <input
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
          style={{ backgroundColor: "#0c0f16" }}
          className="block w-full rounded-md text-gray-400 text-lg pl-2 pr-2 py-1 font-medium focus:border-violet-600 focus:ring-violet-500 border-gray-800"
          placeholder=""
        />
      </div>
    </div>
  );
}

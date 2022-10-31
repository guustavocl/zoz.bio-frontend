type FloatInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errorMessage?: string;
};

export default function FloatInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete = "off",
  errorMessage,
}: FloatInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={`block rounded px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 focus:border-indigo-700 peer focus:ring-indigo-700 ${
          errorMessage ? "border-red-600" : "border-gray-600"
        }`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-4x1 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
      {errorMessage && (
        <label
          htmlFor={id}
          className="absolute text-3x1 text-red-600 duration-300 top-3 right-2.5 scale-90"
        >
          {errorMessage}
        </label>
      )}
    </div>
  );
}

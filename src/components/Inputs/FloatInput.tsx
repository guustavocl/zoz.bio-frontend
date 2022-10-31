type FloatInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errors?: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
};

export default function FloatInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete = "off",
  errors,
  value,
  onChange,
}: FloatInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`block rounded px-2.5 pb-1.5 pt-4 w-full text-sm text-zinc-300 bg-inherit focus:border-indigo-400 peer focus:ring-indigo-400 ${
          errors ? "border-red-600" : "border-zinc-500"
        }`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-4x1 text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
      {errors && (
        <label
          htmlFor={id}
          className="absolute text-3x1 text-red-600 duration-300 top-3 right-2.5 scale-90"
        >
          {errors}
        </label>
      )}
    </div>
  );
}

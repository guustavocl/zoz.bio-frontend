import React from "react";

type ZozInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  size?: number;
  minSize?: number;
  value: string;
  bgColor?: string;
  iconAdornment?: JSX.Element;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

const ZozInput = ({
  id,
  name,
  label,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
  autoComplete = "off",
  errors,
  value,
  size,
  minSize,
  bgColor = "bg-tertiary",
  iconAdornment,
  onChange,
  onBlur,
}: ZozInputProps) => {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium select-none ${
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
          className={`block text-sm font-medium select-none ${
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
        {iconAdornment ? (
          <div className="absolute right-2 flex flex-col items-center justify-center h-full">
            {iconAdornment}
          </div>
        ) : null}
        {type === "textarea" ? (
          <textarea
            className={
              "w-full block rounded-md text-lg font-medium pl-2 pr-2 py-1 " +
              `${bgColor} border-gray-900 ` +
              "focus:border-violet-600 focus:ring-violet-500 " +
              `${disabled ? "text-gray-600 " : "text-gray-200 "}`
            }
            id={id}
            name={name}
            required={required}
            autoComplete={autoComplete}
            value={value}
            maxLength={size ? size : undefined}
            onChange={(e) => {
              if (onBlur) onBlur(e);
              onChange(e);
            }}
            rows={6}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            className={
              "w-full block rounded-md text-lg font-medium pl-2 pr-2 py-1 " +
              `${bgColor} border-gray-900 ` +
              "focus:border-violet-600 focus:ring-violet-500 " +
              `${disabled ? "text-gray-600 " : "text-gray-200 "}`
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
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ZozInput);

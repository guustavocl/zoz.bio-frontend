"use client";
import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputComponentProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  size?: number;
  minSize?: number;
  bgColor?: string;
  iconAdornment?: JSX.Element;
  watch?: string;
  register: UseFormRegisterReturn<string>;
};

const InputComponent = ({
  id,
  label,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
  autoComplete = "off",
  errorMessage,
  size,
  minSize,
  bgColor = "bg-zinc-700",
  iconAdornment,
  watch = "",
  register,
}: InputComponentProps) => {
  const labelText = errorMessage ? errorMessage : label;
  const textClasses = errorMessage
    ? "text-red-700 group-focus-within:text-red-700"
    : "text-gray-300 group-focus-within:text-violet-500";

  return (
    <div className="group relative py-1">
      <label
        htmlFor={id}
        className={twMerge(
          "block select-none text-sm font-medium",
          disabled ? "text-gray-600" : "text-gray-200",
          textClasses
        )}
      >
        {labelText}
      </label>
      {size && minSize && (
        <label
          htmlFor={id}
          className={twMerge("absolute right-2.5 top-0 block select-none text-sm font-medium", textClasses)}
        >
          {`${minSize && minSize > watch.length ? minSize : watch.length}/${size}`}
        </label>
      )}
      <div className="relative rounded-md">
        {iconAdornment && (
          <div className="absolute right-2 flex h-full flex-col items-center justify-center">{iconAdornment}</div>
        )}
        {type === "textarea" ? (
          <textarea
            className={twMerge(
              "block w-full rounded-md py-1 pl-2 pr-2 text-lg font-medium",
              "border-2 border-primary focus:border-violet-600 focus:outline-none",
              disabled ? "text-gray-600" : "text-gray-200",
              bgColor
            )}
            id={id}
            rows={6}
            required={required}
            disabled={disabled}
            maxLength={size}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register}
          />
        ) : (
          <input
            className={twMerge(
              "block w-full rounded-md px-2 py-1 text-lg font-medium",
              "border-2 border-primary focus:border-violet-600 focus:outline-none",
              disabled ? "text-gray-600" : "text-gray-200",
              bgColor
            )}
            id={id}
            type={type}
            required={required}
            disabled={disabled}
            maxLength={size}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register}
          />
        )}
      </div>
    </div>
  );
};

export default memo(InputComponent);

"use client";
import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";

type InputComponentProps = {
  id: string;
  label: string;
  className?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  size?: number;
  minSize?: number;
  iconAdornment?: JSX.Element;
  watch?: string;
  register?: UseFormRegisterReturn<string>;
};

const InputComponent = ({
  id,
  label,
  className,
  placeholder = "",
  type = "text",
  disabled,
  autoComplete = "off",
  errorMessage,
  size,
  minSize,
  iconAdornment,
  watch = "",
  register,
}: InputComponentProps) => {
  return (
    <div className="group relative py-1">
      <InputLabel
        label={label}
        htmlFor={id}
        errorMessage={errorMessage}
        disabled={disabled}
        size={size}
        minSize={minSize}
        watch={watch}
      />

      <div className="relative rounded-md">
        {iconAdornment && (
          <div className="absolute right-2 flex h-full flex-col items-center justify-center">{iconAdornment}</div>
        )}
        {type === "textarea" ? (
          <textarea
            className={twMerge(
              "block w-full rounded-md py-1 pl-2 pr-2 text-lg font-medium bg-zinc-700",
              "border-2 border-primary/50 focus:border-violet-600 focus:outline-none",
              disabled ? "text-gray-600" : "text-gray-200",
              className
            )}
            id={id}
            rows={6}
            disabled={disabled}
            maxLength={size}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register}
          />
        ) : (
          <input
            className={twMerge(
              "block w-full rounded-md px-2 py-1 text-lg font-medium bg-zinc-700",
              "border-2 border-primary/50 focus:border-violet-600 focus:outline-none",
              disabled ? "text-gray-600" : "text-gray-200",
              className
            )}
            id={id}
            type={type}
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

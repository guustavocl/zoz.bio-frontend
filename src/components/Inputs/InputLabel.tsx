import clsx from "clsx";
import { memo } from "react";

type InputLabelProps = {
  label: string;
  htmlFor: string;
  disabled?: boolean;
  errorMessage?: string;
  size?: number;
  minSize?: number;
  watch?: string;
};

const InputLabel = ({ label, htmlFor, errorMessage, disabled, size, minSize, watch = "" }: InputLabelProps) => {
  const labelText = errorMessage ? errorMessage : label;
  const textClasses = errorMessage
    ? "text-red-700 group-focus-within:text-red-700"
    : "text-gray-300 group-focus-within:text-violet-500";

  return (
    <>
      <label
        htmlFor={htmlFor}
        className={clsx(
          "block select-none text-sm font-medium",
          disabled ? "text-gray-600" : "text-gray-200",
          textClasses
        )}
      >
        {labelText}
      </label>
      {size && minSize != null && (
        <label
          htmlFor={htmlFor}
          className={clsx("absolute right-2.5 top-1 block select-none text-sm font-medium", textClasses)}
        >
          {`${minSize && minSize > watch.length ? minSize : watch.length}/${size}`}
        </label>
      )}
    </>
  );
};
export default memo(InputLabel);

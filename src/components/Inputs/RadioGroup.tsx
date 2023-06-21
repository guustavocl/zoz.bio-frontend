import { memo } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

type RadioGroupComponentProps = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  value: string;
  options: { value: string; component: JSX.Element; color?: string }[];
  iconAdornment?: JSX.Element;
  onChange: (value: string) => void;
};

const RadioGroupComponent = ({ id, label, disabled, errors, value, options, onChange }: RadioGroupComponentProps) => {
  return (
    <div className="w-full max-w-md select-none">
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-medium",
          disabled ? "text-gray-600" : "text-gray-200",
          errors ? "text-red-700 group-focus-within:text-red-700" : "text-gray-300 group-focus-within:text-violet-500"
        )}
      >
        {errors ? errors : label}
      </label>
      <RadioGroup id={id} value={value} onChange={onChange}>
        <div className="mt-1 flex flex-row items-center justify-center gap-2 text-center align-middle">
          {options.map(option => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              disabled={disabled}
              className={clsx(
                "relative flex w-full rounded-lg px-3 py-2 shadow-md focus:outline-none",
                disabled ? "" : "cursor-pointer"
              )}
              style={{
                backgroundColor: option.value === value ? (option.color ? option.color : "#7c3aed") : "#7c3aed40",
              }}
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center">
                    <RadioGroup.Label
                      as="p"
                      className={clsx(
                        "w-full text-sm font-semibold",
                        disabled ? "text-gray-600" : checked ? "text-gray-100" : "text-gray-400"
                      )}
                    >
                      {option.component}
                    </RadioGroup.Label>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default memo(RadioGroupComponent);

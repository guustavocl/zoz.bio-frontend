import React from "react";
import { RadioGroup } from "@headlessui/react";

type ZozRadioGroupProps = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  value: string;
  options: { value: string; component: JSX.Element; color?: string }[];
  iconAdornment?: JSX.Element;
  onChange: (value: string) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

const ZozRadioGroup = ({
  id,
  label,
  required = false,
  disabled = false,
  errors,
  value,
  options,
  onChange,
  onBlur,
}: ZozRadioGroupProps) => {
  return (
    <div className="w-full max-w-md select-none">
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
      <RadioGroup id={id} value={value} onChange={onChange}>
        <div className="flex flex-row gap-2 mt-1 justify-center items-center align-middle text-center">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              disabled={disabled}
              className={({ active, checked }) =>
                `w-full relative flex cursor-pointer rounded-lg px-3 py-2 shadow-md focus:outline-none`
              }
              style={{
                backgroundColor:
                  option.value === value
                    ? option.color
                      ? option.color
                      : "#7c3aed"
                    : "#7c3aed40",
              }}
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center w-full">
                    <RadioGroup.Label
                      as="p"
                      className={`font-semibold text-sm w-full ${
                        checked ? "text-gray-100" : "text-gray-400"
                      }`}
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

export default React.memo(ZozRadioGroup);

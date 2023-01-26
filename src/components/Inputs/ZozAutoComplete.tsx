import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { MediaIconProps } from "../../pages/Page/IconsList";

type ZozAutoCompleteProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  bgColor?: string;
  iconAdornment?: JSX.Element;
  selected?: any;
  list: Map<string, MediaIconProps>;
  setSelected: (value: string) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

const Icon = ({
  media,
  list,
}: {
  media: string;
  list: Map<string, MediaIconProps>;
}) => (
  <div className="absolute left-1.5 flex flex-col items-center justify-center h-full">
    <img
      className="h-7 icon-shadow"
      src={list.get(media)?.icon}
      alt={`${media} icon`}
      loading="lazy"
    />
  </div>
);

const ZozAutoComplete = ({
  id,
  name,
  label,
  disabled = false,
  errors,
  bgColor = "bg-tertiary",
  selected = "",
  list,
  setSelected,
}: ZozAutoCompleteProps) => {
  const [query, setQuery] = useState("");
  const arrayList = [...list.keys()];

  const filtered =
    query === ""
      ? arrayList
      : arrayList.filter((media) =>
          (list.get(media)?.label || "")
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="group relative">
      {/* LABEL */}
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          disabled ? "text-gray-600" : "text-gray-200"
        }`}
      >
        {label}
      </label>
      {/* AUTOCOMPLETE */}
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="relative mt-1">
          <React.Fragment>
            {selected != undefined ? (
              <Icon media={selected} list={list} />
            ) : null}
            <Combobox.Input
              name={name}
              className={
                "w-full block rounded-md text-lg font-medium pl-10 pr-2 py-1 " +
                `${bgColor} border-gray-900 ` +
                "focus:border-violet-600 focus:ring-violet-500 " +
                `${disabled ? "text-gray-600" : "text-gray-200"}`
              }
              displayValue={(media: any) => list.get(media)?.label || ""}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </React.Fragment>
          <Combobox.Options
            className={
              "absolute mt-1 max-h-60 overflow-auto py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 " +
              "w-full block rounded-md text-lg font-medium pl-2 pr-2 py-1 " +
              `${bgColor} border-gray-900 ` +
              "focus:border-violet-600 focus:ring-violet-500 "
            }
          >
            {filtered.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-200">
                Nothing found.
              </div>
            ) : (
              filtered.map((media) => (
                <Combobox.Option
                  key={media}
                  disabled={disabled}
                  className={({ selected, active }) =>
                    `relative cursor-default select-none py-1.5 pl-10 pr-4 rounded-lg flex items-center ${
                      selected
                        ? "bg-violet-900"
                        : active
                        ? "bg-violet-600 text-white"
                        : "text-gray-200"
                    }`
                  }
                  value={media}
                >
                  {() => (
                    <React.Fragment>
                      <span className="block truncate mt-0.5">
                        {list.get(media)?.label}
                      </span>
                      <Icon media={media} list={list} />
                    </React.Fragment>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

export default React.memo(ZozAutoComplete);

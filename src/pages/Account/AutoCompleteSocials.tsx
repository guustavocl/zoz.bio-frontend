import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { socialIconsList } from "../Page/IconsList";

const socialMediaList = [...socialIconsList.keys()];

type AutoCompleteSocialsProps = {
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
  selected?: string;
  setSelected: (value: string) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

const AutoCompleteSocials = ({
  id,
  name,
  label,
  disabled = false,
  errors,
  bgColor = "bg-tertiary",
  selected = "",
  setSelected,
}: AutoCompleteSocialsProps) => {
  const [query, setQuery] = useState("");
  const filtered =
    query === ""
      ? socialMediaList
      : socialMediaList.filter((media) =>
          media
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="group relative">
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
      <div className="relative mt-1 rounded-md">
        {/* AUTOCOMPLETE */}
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <React.Fragment>
              {selected ? (
                <div className="absolute left-1.5 flex flex-col items-center justify-center h-full">
                  <img
                    className="h-7 icon-shadow"
                    src={socialIconsList.get(selected)?.icon}
                    alt={`${socialIconsList.get(selected)?.label} icon`}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <Combobox.Input
                name={name}
                className={
                  "w-full block rounded-md text-lg font-medium pl-10 pr-2 py-1 " +
                  `${bgColor} border-gray-900 ` +
                  "focus:border-violet-600 focus:ring-violet-500 " +
                  `${disabled ? "text-gray-600" : "text-gray-200"}`
                }
                displayValue={(media: string) =>
                  socialIconsList.get(media)?.label || ""
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </React.Fragment>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
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
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {socialIconsList.get(media)?.label}
                          </span>
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-1 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <img
                              className="h-7 icon-shadow"
                              src={socialIconsList.get(media)?.icon}
                              alt={`${media} icon`}
                              loading="lazy"
                            />
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default React.memo(AutoCompleteSocials);

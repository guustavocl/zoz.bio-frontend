import { memo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { MediaIconProps } from "@/types/MediaIconProps";
import { twMerge } from "tailwind-merge";

type AutoCompleteComponentProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  className?: string;
  iconAdornment?: JSX.Element;
  selected?: string;
  list: Map<string, MediaIconProps>;
  setSelected: (value: string) => void;
};

const Icon = ({ media, list }: { media: string; list: Map<string, MediaIconProps> }) => (
  <div className="absolute left-1.5 flex h-full flex-col items-center justify-center">
    <img className="icon-shadow h-7" src={list.get(media)?.icon} alt={`${media} icon`} loading="lazy" />
  </div>
);

//TODO - refactor
const AutoComplete = ({
  id,
  name,
  label,
  disabled = false,
  className,
  selected = "",
  list,
  setSelected,
}: AutoCompleteComponentProps) => {
  const [query, setQuery] = useState("");
  const arrayList = [...list.keys()];

  const filtered =
    query === ""
      ? arrayList
      : arrayList.filter(media =>
          (list.get(media)?.label || "")
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="group relative">
      <label htmlFor={id} className={`block text-sm font-medium ${disabled ? "text-gray-600" : "text-gray-200"}`}>
        {label}
      </label>
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="relative mt-1">
          <>
            {selected != undefined ? <Icon media={selected} list={list} /> : null}
            <Combobox.Input
              name={name}
              className={twMerge(
                "block w-full rounded-md py-1 pl-10 pr-2 text-lg font-medium",
                "focus:border-violet-600 focus:ring-violet-500",
                "bg-zinc-700 border-2 border-primary/50 focus:border-violet-600 focus:outline-none",
                disabled ? "text-gray-600" : "text-gray-200",
                className
              )}
              displayValue={(media: string) => list.get(media)?.label || ""}
              onChange={event => {
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </>
          <Combobox.Options
            className={twMerge(
              "absolute z-10 mt-1 max-h-60 overflow-auto py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
              "block w-full rounded-md py-1 pl-2 pr-2 text-lg font-medium border-gray-900",
              "bg-zinc-900 focus:border-violet-600 focus:ring-violet-500"
            )}
          >
            {filtered.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-200">Nothing found.</div>
            ) : (
              filtered.map(media => (
                <Combobox.Option
                  key={media}
                  disabled={disabled}
                  className={({ selected, active }) =>
                    twMerge(
                      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-10 pr-4",
                      selected ? "bg-violet-900" : active ? "bg-violet-600 text-white" : "text-gray-200"
                    )
                  }
                  value={media}
                >
                  {() => (
                    <>
                      <span className="mt-0.5 block truncate">{list.get(media)?.label}</span>
                      <Icon media={media} list={list} />
                    </>
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

export default memo(AutoComplete);

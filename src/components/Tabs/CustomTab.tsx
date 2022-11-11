import { Tab } from "@headlessui/react";

type CustomTabProps = {
  id?: string;
  label: string;
};

export default function LabelInput({ id, label }: CustomTabProps) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Tab
      id={id}
      key={label}
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-100",
          "ring-opacity-60 ring-offset-2 ring-offset-violet-700 focus:outline-none focus:ring-1",
          selected
            ? "bg-tertiary shadow"
            : "text-gray-200 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      {label}
    </Tab>
  );
}

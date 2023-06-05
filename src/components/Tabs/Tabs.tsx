import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { memo } from "react";

type TabListProps = {
  id?: string;
  label: string;
  disabled?: boolean;
  component: JSX.Element;
};

type TabsProps = {
  id?: string;
  list: TabListProps[];
};

const Tabs = ({ id, list }: TabsProps) => {
  return (
    <Tab.Group>
      <Tab.List className="flex w-full flex-row gap-2">
        {list.map(tab => (
          <Tab
            id={id}
            disabled={tab.disabled}
            key={tab.label}
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg py-3 text-sm font-medium leading-5",
                "font-semibold tracking-wide ring-opacity-60 ring-offset-2 focus:outline-none",
                selected
                  ? "bg-secondary-darker/90 text-violet-200 shadow"
                  : tab.disabled
                  ? "cursor-not-allowed bg-secondary/10 text-violet-200/40"
                  : "bg-[#221141] text-violet-200 hover:bg-secondary-darker/90 hover:text-white"
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-4 flex h-full w-full flex-col md:overflow-x-scroll md:overflow-y-scroll">
        {list.map((tab, idx) => (
          <Tab.Panel key={idx} className="flex h-full w-full flex-col items-center">
            {tab.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default memo(Tabs);

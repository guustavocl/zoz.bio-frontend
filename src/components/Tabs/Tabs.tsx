import { Tab } from "@headlessui/react";
import React from "react";

type TabListProps = {
  id?: string;
  label: string;
  component: JSX.Element;
};

type TabsProps = {
  id?: string;
  list: TabListProps[];
};

const Tabs = ({ id, list }: TabsProps) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Tab.Group>
      <Tab.List className="w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl flex flex-row gap-2">
        {list.map(tab => (
          <Tab
            id={id}
            key={tab.label}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-opacity-60 ring-offset-2 focus:outline-none font-semibold tracking-wide",
                selected
                  ? "text-gray-200 bg-violet-900 bg-opacity-40 shadow"
                  : "text-gray-400 hover:bg-violet-600 hover:bg-opacity-20 hover:text-white"
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="w-full mt-4 h-full md:overflow-y-scroll md:overflow-x-scroll flex flex-col">
        {list.map((tab, idx) => (
          <Tab.Panel key={idx} className="h-full flex flex-col items-center">
            {tab.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default React.memo(Tabs);

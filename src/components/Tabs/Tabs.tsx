import { Tab } from "@headlessui/react";

type TabListProps = {
  id?: string;
  label: string;
  component: JSX.Element;
};

type TabsProps = {
  id?: string;
  list: TabListProps[];
};

export default function Tabs({ id, list }: TabsProps) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Tab.Group>
      <Tab.List className="w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl flex flex-row gap-2">
        {list.map((tab, idx) => (
          <Tab
            id={id}
            key={tab.label}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-100",
                "ring-opacity-60 ring-offset-2 focus:outline-none",
                selected
                  ? "bg-violet-900 bg-opacity-40 shadow"
                  : "text-gray-200 hover:bg-violet-600 hover:bg-opacity-20 hover:text-white"
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
}

// import { Tab } from "@headlessui/react";

// type TabListProps = {
//   id?: string;
//   label: string;
//   component: JSX.Element;
// };

// type TabsProps = {
//   id?: string;
//   list: TabListProps[];
// };

// export default function Tabs({ id, list }: TabsProps) {
//   function classNames(...classes: any) {
//     return classes.filter(Boolean).join(" ");
//   }

//   return (
//     <Tab.Group>
//       <Tab.List className="grid grid-cols-4 gap-2 md:gap-3 rounded-xl p-2">
//         {list.map((tab, idx) => (
//           <Tab
//             id={id}
//             key={tab.label}
//             className={({ selected }) =>
//               classNames(
//                 "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-100",
//                 "ring-opacity-60 ring-offset-2 ring-offset-violet-700 focus:outline-none focus:ring-1",
//                 selected
//                   ? "bg-tertiary shadow"
//                   : "text-gray-200 hover:bg-primary hover:text-white"
//               )
//             }
//           >
//             {tab.label}
//           </Tab>
//         ))}
//       </Tab.List>

//       <Tab.Panels className="h-full px-2 col-span-12 md:col-start-3 md:col-span-1 rounded-xl md:overflow-y-scroll md:overflow-x-scroll flex flex-col">
//         {list.map((tab, idx) => (
//           <Tab.Panel
//             key={idx}
//             className="w-full md:h-full rounded-xl p-4 md:p-6 bg-tertiary md:overflow-y-scroll md:overflow-x-scroll flex gap-2 flex-col"
//           >
//             {tab.component}
//           </Tab.Panel>
//         ))}
//       </Tab.Panels>
//     </Tab.Group>
//   );
// }

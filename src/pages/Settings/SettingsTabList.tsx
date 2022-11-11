import React from "react";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import defaultAvatar from "../../assets/default-avatar.png";
import { CustomTab } from "../../components/Tabs";

const SettingsTabList = () => {
  return (
    <Tab.Group>
      <Tab.List className="grid grid-cols-4 gap-2 md:gap-4 rounded-xl md:mb-4 p-2">
        <CustomTab label={"Settings"} />
        <CustomTab label={"Social"} />
        <CustomTab label={"Links"} />
        <CustomTab label={"Subscription"} />
      </Tab.List>

      <Tab.Panels className="px-2 h-auto md:h-full col-span-12 md:col-start-3 md:col-span-1 rounded-xl overflow-y-scroll overflow-x-scroll flex flex-col">
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          {[...Array(20)].map((x, i) => (
            <div className="flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                className="w-20 h-20 rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={defaultAvatar}
                alt=""
              />
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          {[...Array(20)].map((x, i) => (
            <div className="flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                className="w-20 h-20 rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={defaultAvatar}
                alt=""
              />
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          {[...Array(20)].map((x, i) => (
            <div className="flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                className="w-20 h-20 rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={defaultAvatar}
                alt=""
              />
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          {[...Array(20)].map((x, i) => (
            <div className="flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                className="w-20 h-20 rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={defaultAvatar}
                alt=""
              />
            </div>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default SettingsTabList;

import React from "react";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import SettingsTabList from "./SettingsTabList";
import defaultAvatar from "../../assets/default-avatar.png";

const Settings = () => {
  return (
    <div className="grid gap-4 grid-cols-12 h-full pt-2 md:p-3">
      <div className="px-4 md:px-0 h-auto md:h-full center md:items-center col-span-12 md:col-span-3 lg:col-start-3 lg:col-span-1 rounded-xl overflow-y-scroll overflow-x-scroll flex gap-2 flex-row md:flex-col">
        <div className="w-full p-4 mt-2 rounded-xl items-center bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-row md:flex-col">
          {[...Array(20)].map((x, i) => (
            <div className="flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                className="w-20 h-20 rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={defaultAvatar}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-2 pb-4 md:pb-0 h-auto md:h-full col-span-12 md:col-span-8 lg:col-span-7 rounded-xl overflow-y-scroll overflow-x-scroll flex gap-2 flex-col md:flex-col">
        <SettingsTabList />
      </div>
    </div>
  );
};

export default Settings;

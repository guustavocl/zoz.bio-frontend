import { Tab } from "@headlessui/react";
import { CustomTab } from "../../../components/Tabs";
import { IUser } from "../../../types/IUser";
import TabSettings from "./TabSettings";

const TabGroupAccount = ({ account }: { account?: IUser }) => {
  return (
    <Tab.Group>
      <Tab.List className="grid grid-cols-4 gap-2 md:gap-3 rounded-xl p-2">
        <CustomTab label={"Settings"} />
        <CustomTab label={"Subscription"} />
      </Tab.List>

      <Tab.Panels className="px-2 h-auto md:h-full col-span-12 md:col-start-3 md:col-span-1 rounded-xl overflow-y-scroll overflow-x-scroll flex flex-col">
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          <TabSettings account={account} />
        </Tab.Panel>
        <Tab.Panel className="h-full rounded-xl p-6 bg-tertiary overflow-y-scroll overflow-x-scroll flex gap-2 flex-col">
          world
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabGroupAccount;

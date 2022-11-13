import { Tabs } from "../../../components/Tabs";
import TabSettings from "./TabSettings";
import { IUser } from "../../../types/IUser";

const TabGroupAccount = ({ account }: { account?: IUser }) => {
  return (
    <Tabs
      list={[
        { label: "Settings", component: <TabSettings account={account} /> },
        {
          label: "Subscription",
          component: <div>nothing yet</div>,
        },
      ]}
    />
  );
};

export default TabGroupAccount;

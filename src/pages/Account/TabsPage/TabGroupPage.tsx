import { IUser } from "../../../types/IUser";
import { Tabs } from "../../../components/Tabs";

const TabGroupPage = ({ account }: { account?: IUser }) => {
  return (
    <Tabs
      list={[
        {
          label: "Page",
          component: <div>nothing yet</div>,
        },
        {
          label: "Social",
          component: <div>nothing yet</div>,
        },
        {
          label: "Links",
          component: <div>nothing yet</div>,
        },
      ]}
    />
  );
};

export default TabGroupPage;

import React, { useState } from "react";
import defaultAvatar from "../../assets/default-avatar.png";
import TabGroupAccount from "./TabsAccount/TabGroupAccount";
import userService from "../../services/user.service";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useQuery } from "@tanstack/react-query";
import AccountPages from "./AccountPages";
import DialogNewPage from "./DialogNewPage";
import TabGroupPage from "./TabsPage/TabGroupPage";

const pages = [
  {
    id: 1,
    avatar: defaultAvatar,
  },
  {
    id: 2,
    avatar: defaultAvatar,
  },
];

const Account = () => {
  const auth = useAuth();
  const [pannelSelected, setPannelSelected] = useState("account");
  const [isOpen, setIsOpen] = useState(false);
  const { errorToast, successToast } = useToasts();

  const queryAccount = useQuery({
    queryKey: ["account"],
    queryFn: () => userService.getUser(auth.email || ""),
  });

  if (queryAccount.isError) {
    const error = queryAccount.error as Error;
    errorToast(error.message);
  }

  return (
    <React.Fragment>
      <div className="grid gap-1 grid-cols-12 md:h-screen80 content-start md:place-content-stretch pt-1 md:p-6 overflow-clip md:overflow-hidden">
        <AccountPages
          pages={pages}
          setPannelSelected={setPannelSelected}
          openDialog={() => setIsOpen(true)}
        />

        <div className="w-full md:h-full px-2 pb-4 md:pb-0 col-span-full md:col-span-8 lg:col-span-7 rounded-xl md:overflow-y-scroll md:overflow-x-scroll flex gap-1 flex-col md:flex-col flex-1">
          {pannelSelected === "account" ? (
            <TabGroupAccount account={queryAccount.data?.user} />
          ) : (
            <TabGroupPage />
          )}
        </div>
      </div>

      <DialogNewPage isOpen={isOpen} setIsOpen={setIsOpen} />
    </React.Fragment>
  );
};

export default Account;

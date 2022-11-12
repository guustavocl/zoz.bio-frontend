import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/default-avatar.png";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import TabGroupAccount from "./TabsAccount/TabGroupAccount";
import TabGroupProfile from "./TabsProfile/TabGroupProfile";
import userService from "../../services/user.service";
import { useToast } from "../../context/ToastProvider/useToast";
import { IUser } from "../../types/IUser";
import { useAuth } from "../../context/AuthProvider/useAuth";

const profiles = [
  {
    id: 1,
    username: "guustavocl",
    avatar: defaultAvatar,
  },
  {
    id: 2,
    username: "john",
    avatar: defaultAvatar,
  },
];

const Account = () => {
  const auth = useAuth();
  const [pannelSelected, setPannelSelected] = useState("account");
  const [account, setAccount] = useState<IUser>();
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const reqTimeOut = setTimeout(() => {
      userService
        .getUser(auth?.email || "")
        .then((response) => {
          setAccount(response.user);
        })
        .catch((error) => {
          errorToast(error.message);
        });
    }, 200);
    return () => clearTimeout(reqTimeOut);
  }, []);

  return (
    <div className="grid gap-1 grid-cols-12 h-full pt-1 md:p-6">
      <div className="w-full h-auto md:col-start-3 col-span-12 md:col-span-1 flex flex-col gap-1 md:gap-3 px-3 md:px-0 overflow-hidden">
        <button
          className="w-full rounded-lg bg-primary flex flex-row justify-center items-center group hover:text-violet-600 text-sm font-semibold mt-2 p-2 mb-2 md:mb-0 py-2.5 leading-5"
          onClick={() => setPannelSelected("account")}
        >
          Account
          <Cog6ToothIcon
            className="ml-1 h-3 text-violet-600 group-hover:text-violet-900"
            aria-hidden="true"
          />
        </button>
        {/* avatares */}
        <div className="w-full h-full flex flex-row md:flex-col md:items-center overflow-y-hidden md:overflow-y-scroll overflow-x-scroll md:overflow-x-hidden rounded-xl bg-tertiary p-2 md:p-0 lg:p-4">
          <button className="bg-primary py-2 px-6 my-5 md:my-0 md:px-0 group text-center cursor-pointer font-semibold w-full rounded-md hover:text-violet-600 p-1 text-sm ">
            New profile
          </button>
          {profiles.map((profile, i) => (
            <div
              key={profile.id}
              className="cursor-pointer flex-shrink-0 p-2"
              onClick={() => setPannelSelected("profile")}
            >
              <img
                className="h-20 md:h-full rounded-full ring-1 ring-violet-800 bg-violet-200"
                src={profile.avatar}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 pb-4 md:pb-0 h-auto md:h-full col-span-12 md:col-span-8 lg:col-span-7 rounded-xl overflow-y-scroll overflow-x-scroll flex gap-1 flex-col md:flex-col">
        {pannelSelected === "account" ? (
          <TabGroupAccount account={account} />
        ) : (
          <TabGroupProfile />
        )}
      </div>
    </div>
  );
};

export default Account;

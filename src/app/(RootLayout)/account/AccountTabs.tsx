import Tabs from "@/components/Tabs";
import Tooltip from "@/components/Tooltip";
import { PageProps } from "@/types/PageProps";
import { UserProps } from "@/types/UserProps";
import { useState } from "react";
import AccountTabSettings from "./AccountTabSettings";
import AccountTabSubscriptions from "./AccountTabSubscriptions";
import DialogNewPage from "./Dialogs/DialogNewPage";

type AcountTabsProps = {
  account: UserProps | undefined;
  pages: PageProps[] | undefined;
  addNewPage: (page: PageProps) => void;
  setPage: (page: PageProps) => void;
};

export const AccountTabs = ({ account, pages, addNewPage, setPage }: AcountTabsProps) => {
  const [dialogNewPageOpen, setDialogNewPageOpen] = useState(false);

  return (
    <>
      <div className="flex h-full w-full select-none flex-col overflow-y-auto">
        <div className="relative mb-2 ml-11 mt-8 flex animate-pulse flex-row text-left font-semibold text-gray-400">
          <span className="self-center">↓</span>
          <span className="ml-2">Create a new page or click on the page you want to edit</span>
        </div>

        <div id="pages" className="mb-4 flex w-full flex-shrink-0 flex-row gap-2 overflow-y-hidden overflow-x-scroll">
          <div
            onClick={() => setDialogNewPageOpen(true)}
            className="group mx-1 my-2 flex h-24 w-24 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-full bg-secondary/30 ring-4 ring-violet-200/80 hover:bg-secondary/50 hover:ring-white"
          >
            <span className="text-3xl font-semibold opacity-50 group-hover:hidden ">+</span>
            <span className="text-md hidden  font-semibold opacity-50 group-hover:flex ">New Page</span>
          </div>

          {pages
            ? pages.map((page: PageProps, idx: number) => (
                <div key={idx} className="group flex flex-shrink-0 flex-col items-center justify-center">
                  <Tooltip content={page.pagename}>
                    {page.pfpUrl ? (
                      <img
                        src={page.pfpUrl}
                        className="mx-1 my-2 h-24 w-24 cursor-pointer rounded-full object-cover opacity-60 ring-4 ring-secondary hover:opacity-90 hover:ring-secondary-lighter"
                        onClick={() => setPage(page)}
                        alt="pfp"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="mx-1 my-2 h-24 w-24 cursor-pointer rounded-full object-cover opacity-60 ring-4 ring-secondary hover:opacity-90 hover:ring-secondary-lighter"
                        style={{ backgroundColor: "#85c5e5" }}
                        onClick={() => setPage(page)}
                      >
                        {/* TODO - no avatar */}
                      </div>
                    )}
                  </Tooltip>
                </div>
              ))
            : null}
        </div>

        <div className="flex h-full w-full flex-col items-center">
          {/* TODO melhorar essa tabs */}
          <Tabs
            tabList={[
              {
                label: "⚙️ Account Settings",
                component: <AccountTabSettings account={account} />,
              },
              {
                label: "⚠️ Subscriptions",
                component: <AccountTabSubscriptions account={account} />,
              },
              {
                label: "💸 Pages Analytics",
                disabled: true,
                component: <AccountTabSettings account={account} />,
              },
              {
                label: "😍 🫣 🤓",
                disabled: true,
                component: <AccountTabSettings account={account} />,
              },
            ]}
          />
        </div>
      </div>
      <DialogNewPage isOpen={dialogNewPageOpen} addNewPage={addNewPage} setIsOpen={setDialogNewPageOpen} />
    </>
  );
};

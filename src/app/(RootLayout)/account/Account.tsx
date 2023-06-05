"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageProps } from "@/types/PageProps";
import { UserProps } from "@/types/UserProps";
// import { useToasts } from "../../context/ToastProvider/useToasts";
import Tabs from "@/components/Tabs";
// import { Cog6ToothIcon } from "@heroicons/react/20/solid";
// import { BigHead } from "@bigheads/core";
import PageEdit from "./PageEdit";
import DialogNewPage from "./DialogNewPage";
import AccountTabSettings from "./AccountTabSettings";
// import { LazyLoadImage } from "@/components/Loadings";
import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import { getAccount } from "@/services/AccountService";

const accountSettings = (account: UserProps) => {
  return (
    <BioCard className="h-screen70 w-full select-none overflow-y-scroll" center={false} bioPage={false}>
      <div className="flex w-full flex-col gap-2 overflow-hidden p-2">
        <AccountTabSettings account={account} />
      </div>
    </BioCard>
  );
};

const accountSubscription = (account: UserProps) => {
  return (
    <BioCard className="h-screen70 w-full select-none overflow-y-scroll" center={false} bioPage={false}>
      <div className="flex w-full flex-col gap-2 overflow-hidden p-2">SOON</div>
    </BioCard>
  );
};

const AccountComponent = () => {
  const [page, setPage] = useState<PageProps>();
  const [pages, setPages] = useState<PageProps[]>();
  const [account, setAccount] = useState<UserProps[]>();
  const [dialogNewPageOpen, setDialogNewPageOpen] = useState(false);
  // const { errorToast } = useToasts();

  const queryAccount = useQuery({
    queryKey: ["getAccount"],
    queryFn: () => getAccount(),
  });

  if (queryAccount.isError) {
    const error = queryAccount.error as Error;
    console.log(error);
    // errorToast(error.message);
  }

  if (queryAccount.data?.pages && !pages) {
    setPages(queryAccount.data.pages);
  }
  if (queryAccount.data?.user && !account) {
    console.log(account);
    setAccount(queryAccount.data.user);
  }

  useEffect(() => {
    const scrollContainer = document.getElementById("pages");
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", evt => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });
    }
  }); //fix this use effect later add dependency

  const addNewPage = (page: PageProps) => {
    if (pages) setPages([...pages, page]);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center overflow-hidden">
      {page ? (
        <div>pagedit</div>
      ) : (
        // <PageEdit
        //   page={page}
        //   setPage={(page: PageProps | undefined) => {
        //     setPage(page);
        //     setPages(
        //       pages?.map(item => {
        //         return item.pagename === page?.pagename ? page : item;
        //       })
        //     );
        //   }}
        // />
        <>
          <div className="flex h-screen w-full select-none flex-col overflow-y-auto">
            <div className="relative mb-2 ml-10 mt-8 flex animate-pulse flex-row text-left font-semibold text-gray-400">
              <span className="self-center">↓</span>
              <span className="ml-2">Create a new page or click on the page you want to edit</span>
            </div>

            <div
              id="pages"
              className="mb-4 flex w-full flex-shrink-0 flex-row gap-2 overflow-y-hidden overflow-x-scroll"
            >
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
                      <span
                        className="absolute z-30 hidden -translate-y-10 select-none rounded-lg px-3 py-1 font-mono text-sm text-gray-100 backdrop-blur-3xl transition-opacity group-hover:flex"
                        style={{ backgroundColor: "#000000" }}
                      >
                        {page.pagename}
                      </span>
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
                          {/* <BigHead /> */}
                        </div>
                      )}
                    </div>
                  ))
                : null}
            </div>

            <div className="flex h-full w-full flex-col items-center">
              {/* TODO melhorar essa tabs */}
              <Tabs
                list={[
                  {
                    label: "⚙️ Account Settings",
                    component: accountSettings(queryAccount.data?.user),
                  },
                  {
                    label: "⚠️ Subscriptions",
                    component: accountSubscription(queryAccount.data?.user),
                  },
                  {
                    label: "💸 Pages Analytics",
                    disabled: true,
                    component: accountSettings(queryAccount.data?.user),
                  },
                  {
                    label: "😍 🫣 🤓",
                    disabled: true,
                    component: accountSettings(queryAccount.data?.user),
                  },
                ]}
              />
            </div>
          </div>
          <DialogNewPage isOpen={dialogNewPageOpen} addNewPage={addNewPage} setIsOpen={setDialogNewPageOpen} />
        </>
      )}
    </div>
  );
};

export default AccountComponent;

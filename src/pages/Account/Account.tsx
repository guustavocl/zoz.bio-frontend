import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPage } from "../../types/IPage";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useToasts } from "../../context/ToastProvider/useToasts";
import Tabs from "../../components/Tabs";
import { IUser } from "../../types/IUser";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { BigHead } from "@bigheads/core";
import PageEdit from "./PageEdit";
import DialogNewPage from "./DialogNewPage";
import SectionCard from "../Page/SectionCard";
import AccountTabSettings from "./AccountTabSettings";
import userService from "../../services/user.service";
import { LazyLoadImage } from "../../components/Loading";

const accountSettings = (account: IUser) => {
  return (
    <SectionCard className="w-full select-none h-screen70 overflow-y-scroll " center={false}>
      <div className="w-full flex flex-col gap-2 overflow-hidden p-2">
        <AccountTabSettings account={account} />
      </div>
    </SectionCard>
  );
};

// const accountSubscription = (account: IUser) => {
//   return (
//     <SectionCard className="w-full select-none h-screen70 overflow-y-scroll " center={false}>
//       <div className="w-full flex flex-col gap-2 overflow-hidden p-2">SOON</div>
//     </SectionCard>
//   );
// };

const Account = () => {
  const auth = useAuth();
  const [page, setPage] = useState<IPage>();
  const [pages, setPages] = useState<IPage[]>();
  const [dialogNewPageOpen, setDialogNewPageOpen] = useState(false);
  const { errorToast } = useToasts();

  const queryAccount = useQuery({
    queryKey: ["account"],
    queryFn: () => userService.getUser(auth.email || ""),
  });

  if (queryAccount.isError) {
    const error = queryAccount.error as Error;
    errorToast(error.message);
  }

  if (queryAccount.data?.pages && !pages) {
    setPages(queryAccount.data.pages);
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

  const addNewPage = (page: IPage) => {
    if (pages) setPages([...pages, page]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center overflow-hidden">
      {page ? (
        <PageEdit
          page={page}
          setPage={(page: IPage | undefined) => {
            setPage(page);
            setPages(
              pages?.map(item => {
                return item.pagename === page?.pagename ? page : item;
              })
            );
          }}
        />
      ) : (
        <React.Fragment>
          <div className="w-full hidden absolute left-0 md:flex p-3 pl-4">
            <div className="w-full flex flex-row justify-between">
              <button
                className="text-sm bg-opacity-5 opacity-50 rounded-lg font-semibold hover:opacity-90"
                onClick={() => {
                  setPage(undefined);
                }}
              >
                <Cog6ToothIcon className="h-5" aria-hidden="true" />
              </button>
              <button
                className="text-md bg-opacity-5 opacity-50 rounded-lg font-semibold hover:opacity-90"
                onClick={auth.logout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Default background  */}
          <LazyLoadImage />

          <div className="select-none flex flex-col items-center max-w-2x1 px-0 mx-3 md:mx-2 sm:px-10 p-2 md:w-full h-screen overflow-y-auto">
            <div className="mt-8 mb-2 text-gray-400 font-semibold animate-pulse text-center">
              ↓ Create a new page or click on the page you want to edit ↓
            </div>
            <div
              id="pages"
              className="flex-shrink-0 mb-4 w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl flex flex-row gap-2 overflow-x-scroll overflow-y-hidden"
            >
              <div
                onClick={() => setDialogNewPageOpen(true)}
                className="flex-shrink-0 group w-24 h-24 rounded-full bg-violet-600 bg-opacity-30 flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-50"
              >
                <span className="group-hover:hidden opacity-50 font-semibold text-3xl ">+</span>
                <span className="hidden group-hover:flex  opacity-50 font-semibold text-md ">New Page</span>
              </div>

              {pages
                ? pages.map((page: IPage, idx: number) => (
                    <div key={idx} className="flex-shrink-0 group flex flex-col items-center justify-center">
                      <span
                        className="z-30 select-none hidden absolute group-hover:flex transition-opacity text-sm font-mono text-gray-100 backdrop-blur-3xl rounded-lg px-3 py-1 -translate-y-10"
                        style={{ backgroundColor: "#000000" }}
                      >
                        {page.pagename}
                      </span>
                      {page.pfpUrl ? (
                        <img
                          src={page.pfpUrl}
                          className="h-24 w-24 object-cover rounded-full opacity-60 hover:opacity-90 cursor-pointer"
                          onClick={() => setPage(page)}
                          alt="pfp"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="h-24 w-24 object-cover rounded-full opacity-60 hover:opacity-90 cursor-pointer"
                          style={{ backgroundColor: "#85c5e5" }}
                          onClick={() => setPage(page)}
                        >
                          <BigHead />
                        </div>
                      )}
                    </div>
                  ))
                : null}
            </div>

            <div className="w-full h-full flex flex-col items-center">
              <Tabs
                list={[
                  {
                    label: "Settings",
                    component: accountSettings(queryAccount.data?.user),
                  },
                  // {
                  //   label: "Subscription",
                  //   component: accountSubscription(queryAccount.data?.user),
                  // },
                ]}
              />
            </div>
          </div>

          <DialogNewPage isOpen={dialogNewPageOpen} addNewPage={addNewPage} setIsOpen={setDialogNewPageOpen} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Account;

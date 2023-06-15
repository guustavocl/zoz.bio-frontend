"use client";
import { getAccount } from "@/services/AccountService";
import { PageProps } from "@/types/PageProps";
import { UserProps } from "@/types/UserProps";
import { errorToast } from "@/utils/toaster";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountTabs } from "./AccountTabs";
import PageEdit from "./PageEdit";

const AccountComponent = () => {
  const [page, setPage] = useState<PageProps>();
  const [pages, setPages] = useState<PageProps[]>();
  const [account, setAccount] = useState<UserProps>();
  const router = useRouter();

  useEffect(() => {
    const scrollContainer = document.getElementById("pages");
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", evt => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });
    }
  }); //TODO fix this use effect later add dependency

  const addNewPage = (page: PageProps) => {
    if (pages) setPages([...pages, page]);
  };

  const savePage = (page: PageProps | undefined) => {
    setPage(page);
    setPages(
      pages?.map(item => {
        return item.pagename === page?.pagename ? page : item;
      })
    );
  };

  const queryAccount = useQuery({
    queryKey: ["getAccount"],
    queryFn: () => getAccount(),
  });

  if (queryAccount.isError) {
    if (queryAccount.error === "Unauthorized") {
      errorToast("Session expired, please sign in again");
      deleteCookie("zoz_user");
      router.refresh();
      router.push("/login");
    } else {
      errorToast(queryAccount.error as Error);
    }
  }

  if (queryAccount.data?.pages && !pages) {
    setPages(queryAccount.data.pages);
  }

  if (queryAccount.data?.user && !account) {
    setAccount(queryAccount.data.user);
  }

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center overflow-hidden">
      {page ? (
        <PageEdit page={page} savePage={savePage} />
      ) : (
        <AccountTabs account={account} pages={pages} addNewPage={addNewPage} setPage={setPage} />
      )}
    </div>
  );
};

export default AccountComponent;

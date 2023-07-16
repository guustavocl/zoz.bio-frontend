"use client";
import { getAccount, sendConfirmEmail } from "@/services/AccountService";
import { PageProps } from "@/types/PageProps";
import { UserProps } from "@/types/UserProps";
import { errorToast, successToast } from "@/utils/toaster";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountTabs } from "./AccountTabs";
import { LabelButton } from "@/components/Buttons";

// TODO - maybe change this to server component
const AccountComponent = () => {
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
  }); //TODO - fix this use effect later add dependency

  const addNewPage = (page: PageProps) => {
    if (pages) setPages([...pages, page]);
  };

  // TODO - query cache
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
    <div className="flex h-full w-full flex-grow flex-col items-center overflow-hidden mb-12 relative">
      {account && !account.isEmailConfirmed && (
        <div className="w-full bg-yellow-500 p-3 rounded text-black/80">
          {/* TODO - send confirmation email and validade time to be 1min cooldown */}
          <span>
            We noticed that your email has not been confirmed yet. So your account is limited, and can be suspended
            without further notice. Check your spam folder if you can&apos;t find it, or{" "}
            <LabelButton
              id="resend-confirmation-btn"
              className="text-violet-800 font-semibold"
              label="click here to resend the confirmation email!"
              onClick={() => {
                sendConfirmEmail(account.email || "", "aa")
                  .then(() => {
                    successToast("Confirmation email successfully sended, check your inbox or spam directory");
                  })
                  .catch(err => {
                    errorToast(err);
                  });
              }}
            />
          </span>
        </div>
      )}
      <AccountTabs account={account} pages={pages} addNewPage={addNewPage} />
    </div>
  );
};

export default AccountComponent;

import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import { UserProps } from "@/types/UserProps";
import { memo } from "react";

const AccountTabSettings = ({ account }: { account?: UserProps }) => {
  return (
    <BioCard className="h-full min-h-max w-full flex-grow select-none overflow-y-scroll" center={false}>
      <div className="flex w-full flex-grow flex-col gap-2 overflow-hidden p-2">
        <form>
          <label>{account ? account.email : ""}</label>
        </form>
      </div>
    </BioCard>
  );
};

export default memo(AccountTabSettings);

import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import { Input } from "@/components/Inputs";
import { UserProps } from "@/types/UserProps";
import { memo } from "react";

const AccountTabSettings = ({ account }: { account?: UserProps }) => {
  return (
    <BioCard className="h-full min-h-max w-full flex-grow select-none overflow-y-scroll p-3" center={false}>
      <div className="flex w-full flex-grow flex-col gap-2 overflow-hidden p-2">
        <div className="flex flex-col w-[20rem]">
          <Input id="acc-name" label="Account name" className="bg-black/20" placeholder={account?.uname} disabled />
          <Input id="acc-email" label="Email" className="bg-black/20" placeholder={account?.email} disabled />
          <Input
            id="acc-sub"
            label="Subscription"
            className="bg-black/20"
            placeholder={account?.subscription}
            disabled
          />
        </div>
      </div>
    </BioCard>
  );
};

export default memo(AccountTabSettings);

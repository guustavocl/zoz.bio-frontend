"use client";
import { PageProps } from "@/types/PageProps";
import { memo } from "react";
import { HomeIcon, Cog6ToothIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/Buttons";
import { UserProps } from "@/types/UserProps";

const BioNavigation = ({ page, user }: { page: PageProps; user: UserProps }) => {
  //TODO - make a better visual here, make report dialog
  if (page && user)
    return (
      <div className="absolute right-0 m-2 gap-1 flex flex-col">
        <Link href="/account" className="group rounded-xl text-violet-200 bg-primary/70 px-2">
          <div className="flex opacity-60 flex-row w-full text-[18px] items-center group-hover:opacity-90">
            <Cog6ToothIcon className="h-4 mr-1" aria-hidden="true" />
            <span>Account</span>
          </div>
        </Link>
        <button
          id="report-btn"
          type="button"
          onClick={() => console.log("click")}
          className="group rounded-xl text-red-500 bg-primary/70 px-2 hover:text-red"
        >
          <div className="flex opacity-60 flex-row w-full text-[18px] items-center group-hover:opacity-90">
            <ExclamationTriangleIcon className="h-4 mr-1" aria-hidden="true" />
            <span>Report</span>
          </div>
        </button>
      </div>
    );

  return (
    <div className="absolute right-0 m-2">
      <Link href="/" className="group px-2 rounded-xl text-violet-200 bg-primary/70">
        <div className="flex opacity-60 flex-row text-[18px] items-center group-hover:opacity-90">
          <HomeIcon className="h-4 mr-1" aria-hidden="true" />
          <span className="flex group-hover:hidden">zoz.bio</span>
          <span className="ml-1 hidden group-hover:flex">create your bio page</span>
        </div>
      </Link>
    </div>
  );
};
export default memo(BioNavigation);

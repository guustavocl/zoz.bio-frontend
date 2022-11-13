import { Cog6ToothIcon } from "@heroicons/react/20/solid";

type PagesProps = {
  id: number;
  avatar: string;
};

type AccountPagesProps = {
  pages: PagesProps[];
  setPannelSelected: (value: string) => void;
  openDialog: () => void;
};

const AccountPages = ({
  pages,
  setPannelSelected,
  openDialog,
}: AccountPagesProps) => {
  return (
    <div className="w-full h-44 md:h-full md:col-start-3 col-span-full md:col-span-1 flex flex-col gap-1 md:gap-3 px-3 md:px-0 overflow-hidden">
      <button
        type="button"
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
      <div className="w-full h-full flex flex-row md:flex-col md:items-center overflow-y-hidden md:overflow-y-scroll overflow-x-scroll md:overflow-x-hidden rounded-xl bg-tertiary p-2 md:p-0 lg:p-2">
        <button
          type="button"
          onClick={openDialog}
          className="bg-violet-800 py-1 px-6 my-5 md:my-0 md:px-0 group text-center cursor-pointer font-semibold w-full rounded-md hover:bg-violet-900 p-1 text-sm "
        >
          New page
        </button>
        {pages.map((page, i) => (
          <div
            key={page.id}
            className="cursor-pointer flex-shrink-0 p-2"
            onClick={() => setPannelSelected("page")}
          >
            <img
              className="h-20 md:h-full rounded-full ring-1 ring-violet-800 bg-violet-200"
              src={page.avatar}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPages;

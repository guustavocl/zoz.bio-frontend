import { LinkButton } from "@/components/Buttons";
import Socials from "./Socials";
import clsx from "clsx";
import Username from "./Username";

const Hero = () => {
  return (
    <section className="mb-12 grid grid-cols-12">
      <div className="mr-auto place-self-center col-span-12 w-full text-center items-center flex flex-col">
        <Socials />
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight leading-none text-center w-full gap-2 justify-center items-center">
          Link all your socials in one place
        </h1>
        <Username />
        <p className="mb-6 text-gray-500 lg:mb-8 text-2xl lg:text-xl dark:text-gray-400 max-w-3xl">
          Manage one or more pages with just one account, create links and folders, track the views and engagement of
          your socials and links and much more.
        </p>
        <LinkButton
          href="/register"
          className={clsx(
            "relative bg-opacity-0 px-8 py-[0.6rem] text-2xl xl:text-lg font-medium text-center backdrop-blur-lg hover:scale-105 transition-transform",
            "text-violet-200 ring-1 ring-violet-200/20 hover:bg-secondary-darker hover:text-violet-100 hover:ring-0"
          )}
        >
          Create Account
        </LinkButton>
      </div>
    </section>
  );
};
export default Hero;

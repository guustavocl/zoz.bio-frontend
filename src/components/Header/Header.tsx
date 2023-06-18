"use client";
import { memo } from "react";
import { Fragment } from "react";
import { UserProps } from "@/types/UserProps";
import { Link, LinkButton } from "@/components/Buttons";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { errorToast } from "@/utils/toaster";

const HeaderComponent = ({ user }: { user?: UserProps }) => {
  const router = useRouter();

  const logoutRequest = () => {
    logout(user?._id)
      .then(() => {
        deleteCookie("zoz_user");
        router.refresh();
        router.push("/");
      })
      .catch(() => {
        errorToast("Something went wrong, try again~");
      });
  };

  return (
    <Popover className="z-20 container flex w-full flex-row">
      <div className="my-4 flex w-full justify-between">
        <Link href="/" className="w-32 sm:h-16">
          <span className="sr-only">zoz.bio</span>
          <img
            className="w-32 py-2 sm:h-14"
            src={"/zoz.png"}
            alt="zoz.bio logo"
            width="auto"
            height="auto"
            loading="lazy"
          />
        </Link>

        {user?.email ? (
          <div className="hidden items-center justify-end md:flex">
            <LinkButton href="account" label="Account" className="mr-8" />
            <Link href="/" onClick={logoutRequest} label="Logout" />
          </div>
        ) : (
          <div className="hidden items-center justify-end md:flex">
            <Link href="login" label="Sign in" className="mr-8 font-medium text-gray-300" />
            <LinkButton href="register" label="Register" />
          </div>
        )}

        <div className="flex items-center md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 focus:outline-none">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </Popover.Button>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel
            focus
            className="absolute container inset-x-0 top-0 z-50 origin-top-right transform bg-primary transition md:hidden"
          >
            <div className="my-4 rounded-lg shadow-lg ring-0 ring-black ring-opacity-5">
              <div className="flex items-center justify-between">
                <Link href="/" className="w-32 sm:h-16">
                  <span className="sr-only">zoz.bio</span>
                  <img
                    className="w-32 py-2 sm:h-14"
                    src={"/zoz.png"}
                    alt="zoz.bio logo"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                </Link>

                <div className="flex items-center md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 ">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-10 p-6">
                {user?.email ? (
                  <div className="flex flex-col">
                    <LinkButton href="account" label="Account" />
                    <Link href="/" onClick={logoutRequest} label="Logout" className="m-4" />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <LinkButton href="register" label="Register" />
                    <p className="mt-6 text-center text-base font-medium text-gray-300">
                      Already have an account?{" "}
                      <Link href="login" label="Sign in" className="font-medium text-secondary" />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
};

export default memo(HeaderComponent);

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/zoz.png";
import { IAuth } from "../../types/IAuth";
import React from "react";

const Header = ({ auth }: { auth?: IAuth }) => {
  // const isHomePage = window.location.pathname === "/";

  return (
    <Popover className="relative w-full flex flex-row items-center justify-center z-20">
      <div className="w-full lg:max-w-7xl flex flex-row justify-between items-center px-4 py-1">
        <div className="flex flex-row justify-between content-between">
          <a href="/">
            <span className="sr-only">zoz.gg</span>
            <img className="w-32 sm:h-16" src={logo} alt="zoz.gg logo" loading="lazy" />
          </a>
        </div>

        {auth && auth.token ? (
          <div className="hidden items-center justify-end md:flex">
            <a
              onClick={auth.logout}
              rel="noopener noreferrer"
              className=" cursor-pointer whitespace-nowrap text-base font-medium text-gray-300 hover:text-violet-600"
            >
              Logout
            </a>
            <a
              href="/account"
              rel="noopener noreferrer"
              className=" ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
            >
              Account
            </a>
          </div>
        ) : (
          <div className="hidden items-center justify-end md:flex">
            <a
              href="/login"
              rel="noopener noreferrer"
              className=" whitespace-nowrap text-base font-medium text-gray-300 hover:text-violet-600"
            >
              Login
            </a>
            <a
              href="/register"
              rel="noopener noreferrer"
              className=" ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12] hover:text-violet-600"
            >
              Register
            </a>
          </div>
        )}

        <div className="md:hidden flex items-center">
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
            className="absolute inset-x-0 top-0 origin-top-right transform p-0 transition md:hidden bg-secondary z-50"
          >
            <div className="rounded-lg shadow-lg ring-0 ring-black ring-opacity-5 px-4 py-1">
              <div className="flex items-center justify-between">
                <a href="/" rel="noopener noreferrer">
                  <span className="sr-only">zoz.gg</span>
                  <img className="w-32 sm:h-16" src={logo} alt="ZOZ.gg logo" loading="lazy" />
                </a>

                <div className="md:hidden flex items-center">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 ">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                {auth && auth.token ? (
                  <div>
                    <a
                      href="/account"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
                    >
                      Account
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-300">
                      <a
                        onClick={() => {
                          auth.logout();
                        }}
                        rel="noopener noreferrer"
                        className="cursor-pointer text-violet-600 hover:text-violet-700"
                      >
                        Logout
                      </a>
                    </p>
                  </div>
                ) : (
                  <div>
                    <a
                      href="/register"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12] hover:text-violet-600"
                    >
                      Register
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-300">
                      Already have an account?{" "}
                      <a href="/login" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700">
                        Login
                      </a>
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

export default React.memo(Header);

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/zoz.png";
import { IAuth } from "../../types/IAuth";

export default function Header({ auth }: { auth?: IAuth }) {
  const isHomePage = window.location.pathname === "/";

  return (
    <Popover className="relative w-full flex flex-row items-center justify-center">
      <div className="w-full lg:max-w-7xl flex flex-row justify-between items-center px-4 py-1">
        <div className="flex flex-row justify-between content-between">
          <a href="/">
            <span className="sr-only">ZOZ.gg</span>
            <img className="w-32 sm:h-16" src={logo} alt="logo" />
          </a>
        </div>

        {isHomePage ? (
          <div className="hidden items-center justify-center space-x-16 md:flex">
            <a
              href="#"
              className="text-base font-semibold text-gray-300 hover:text-violet-600"
            >
              Nothing
            </a>
            <a
              href="#"
              className="text-base font-semibold text-gray-300 hover:text-violet-600"
            >
              Yet
            </a>
            <a
              href="#"
              className="text-base font-semibold text-gray-300 hover:text-violet-600"
            >
              Here
            </a>
          </div>
        ) : null}

        {auth && auth.token ? (
          <div className="hidden items-center justify-end md:flex">
            <a
              onClick={auth.logout}
              className="cursor-pointer whitespace-nowrap text-base font-medium text-gray-300 hover:text-violet-600"
            >
              Logout
            </a>
            <a
              href="/account"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
            >
              Account
            </a>
          </div>
        ) : (
          <div className="hidden items-center justify-end md:flex">
            <a
              href="/login"
              className="whitespace-nowrap text-base font-medium text-gray-300 hover:text-violet-600"
            >
              Login
            </a>
            <a
              href="/register"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12] hover:text-violet-600"
            >
              Register
            </a>
          </div>
        )}

        <div className="md:hidden flex items-center">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-100 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-600">
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
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden bg-secondary"
          >
            <div className="rounded-lg shadow-lg ring-0 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <a href="/" className="ring-0 focus:ring-0">
                    <span className="sr-only">ZOZ.gg</span>
                    <img
                      className="h-24 w-auto sm:h-16 ring-0"
                      src={logo}
                      alt=""
                    />
                  </a>

                  <div className="md:hidden flex items-center">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-100 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                {isHomePage ? (
                  <div className="text-center grid grid-cols-1 gap-y-4 gap-x-8">
                    <a
                      href="#"
                      className="text-base font-semibold text-gray-300 hover:text-violet-600"
                    >
                      Nothing
                    </a>

                    <a
                      href="#"
                      className="text-base font-semibold text-gray-300 hover:text-violet-600"
                    >
                      Here
                    </a>
                    <a
                      href="#"
                      className="text-base font-semibold text-gray-300 hover:text-violet-600"
                    >
                      Yet
                    </a>
                  </div>
                ) : null}

                {auth && auth.token ? (
                  <div>
                    <a
                      href="/account"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
                    >
                      Account
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-300">
                      <a
                        onClick={() => {
                          auth.logout();
                        }}
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
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12] hover:text-violet-600"
                    >
                      Register
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-300">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-violet-600 hover:text-violet-700"
                      >
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
}

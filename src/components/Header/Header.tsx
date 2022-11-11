import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/zoz.png";
import { IAuth } from "../../types/IAuth";
import { useNavigate } from "react-router-dom";

export default function Header({ auth }: { auth?: IAuth }) {
  const isHomePage = window.location.pathname === "/";

  return (
    <Popover className="relative">
      <div className="grid grid-cols-12 w-full py-4 items-center">
        <div className="col-span-12 md:col-start-3 justify-between md:col-span-2 flex flex-row">
          <a href="/">
            <span className="sr-only">ZOZ.gg</span>
            <img className="w-32 sm:h-16" src={logo} alt="logo" />
          </a>
          <div className="md:hidden flex items-center">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>

        <div className="col-span-4">
          {isHomePage ? (
            <Popover.Group
              as="nav"
              className="hidden items-center justify-center space-x-16 md:flex"
            >
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-100"
              >
                Nothing
              </a>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-100"
              >
                Yet
              </a>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-100"
              >
                Here
              </a>
            </Popover.Group>
          ) : null}
        </div>

        <div className="col-span-2 hidden md:flex ">
          {auth && auth.token ? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                onClick={auth.logout}
                className="cursor-pointer whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100"
              >
                Logout
              </a>
              <a
                href="/settings"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
              >
                Settings
              </a>
            </div>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100"
              >
                Login
              </a>
              <a
                href="/register"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
              >
                Register
              </a>
            </div>
          )}
        </div>
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
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                    className="text-base font-medium text-gray-500 hover:text-gray-100"
                  >
                    Nothing
                  </a>

                  <a
                    href="#"
                    className="text-base font-medium text-gray-500 hover:text-gray-100"
                  >
                    Here
                  </a>
                  <a
                    href="#"
                    className="text-base font-medium text-gray-500 hover:text-gray-100"
                  >
                    Yet
                  </a>
                </div>
              ) : null}

              {auth && auth.token ? (
                <div>
                  <a
                    href="/settings"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
                  >
                    Settings
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    <a
                      onClick={() => {
                        auth.logout();
                      }}
                      className="cursor-pointer text-indigo-600 hover:text-indigo-500"
                    >
                      Logout
                    </a>
                  </p>
                </div>
              ) : (
                <div>
                  <a
                    href="/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/[0.12]"
                  >
                    Register
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
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
    </Popover>
  );
}

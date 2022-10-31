import { LockClosedIcon } from "@heroicons/react/20/solid";
import loginImg from "../../assets/login.png";

export default function Login() {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img
              className="mx-auto h-48 sm:h-72"
              src={loginImg}
              alt="Login svg"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">
              Sign in to edit your profile
            </h2>
            <p className="mt-2 text-center text-2x1 text-gray-300">
              or{" "}
              <a
                href="/register"
                className="font-medium text-indigo-500 hover:text-indigo-600"
              >
                click here to create your account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="py-1">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="off"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border bg-gray-200 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-3x1"
                  placeholder="Username or email address"
                />
              </div>
              <div className="py-1">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border bg-gray-200 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-3x1"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-offset-0 focus:ring-gray-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-2x1 text-gray-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-2x1">
                <a
                  href="#"
                  className="font-medium text-gray-400 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded border border-transparent bg-gray-900 py-2 px-4 text-3x1 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-800 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

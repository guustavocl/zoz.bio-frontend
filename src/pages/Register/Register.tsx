import { UserPlusIcon } from "@heroicons/react/20/solid";
import { FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import registerImg from "../../assets/register.png";
import FloatInput from "../../components/Inputs/FloatInput";

export default function Login() {
  const submitForm = (event: FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault();
    console.log("submit");
    console.log(event);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-1 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img
              className="mx-auto h-32 sm:h-48 md:h-56"
              src={registerImg}
              alt="Register svg"
            />
            <h2 className="pt-1 text-center text-2xl font-bold tracking-tight text-gray-300">
              Sign up to link all your socials in one place! :)
            </h2>
          </div>
          <form className="mt-4 space-y-2" onSubmit={submitForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="py-1.5">
                <FloatInput
                  id="name"
                  name="name"
                  type="text"
                  required
                  label="Display Name"
                />
              </div>
              <div className="py-1.5">
                <FloatInput
                  id="username"
                  name="username"
                  type="text"
                  required
                  label="Username"
                />
              </div>
              <div className="py-1.5">
                <FloatInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  label="Email"
                />
              </div>
              <div className="py-1.5">
                <FloatInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  label="Password"
                />
              </div>
              <div className="py-1.5">
                <FloatInput
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  label="Confirm Password"
                  errorMessage="Confirm Password"
                />
              </div>
            </div>

            <div className="pb-2 flex items-center justify-center">
              <ReCAPTCHA
                sitekey="Your client site key"
                onChange={(value: string | null) => console.log(value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded border border-transparent bg-gray-900 py-2 px-4 text-3x1 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute left-0 flex items-center pl-3">
                  <UserPlusIcon
                    className="h-5 w-5 text-indigo-800 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Create account
              </button>
              <p className="mt-1 text-center text-xs text-gray-300">
                {"By signing up, you agree to the "}
                <a
                  href="/terms"
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                >
                  Terms of Service
                </a>
                {" and "}
                <a
                  href="/privacy"
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
            <p className="mt-2 text-center text-2x1 text-gray-300">
              {"Already have an account? "}
              <a
                href="/login"
                className="font-medium text-indigo-500 hover:text-indigo-600"
              >
                Log in.
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

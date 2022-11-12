import { LockClosedIcon } from "@heroicons/react/20/solid";
import loginImg from "../../assets/login.png";
import { LabelInput } from "../../components/Inputs";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useToast } from "../../context/ToastProvider/useToast";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../types/ILogin";

export default function Login() {
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const json = localStorage.getItem("rl");
    if (json) {
      let rememberInfos: ILogin = JSON.parse(json);
      formik.setValues({
        email: rememberInfos?.email || "",
        password: rememberInfos?.password || "",
        remember: rememberInfos?.remember || false,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      authenticate(values.email, values.password)
        .then(async (response: any) => {
          if (values.remember)
            localStorage.setItem("rl", JSON.stringify(values));
          else localStorage.removeItem("rl");

          successToast(response.message);
          navigate("/account");
        })
        .catch((error) => {
          errorToast(
            error.response && error.response.data
              ? error.response.data.message
              : error.message
          );
          if (error.response && error.response.data) {
            if (error.response.data.confirmation) {
              navigate(`/confirm?email=${values.email}`);
            }
          }
          formik.setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void }) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        formik.submitForm();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img
              className="mx-auto h-48 sm:h-64"
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
                className="font-medium text-violet-500 hover:text-violet-600"
              >
                click here to create your account
              </a>
            </p>
          </div>
          <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="py-1">
                <LabelInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="py-1">
                <LabelInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-offset-0 focus:ring-gray-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-2x1 text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-2x1">
                <a
                  href="#"
                  className="font-medium text-gray-300 hover:text-violet-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="group relative flex w-full justify-center rounded border border-transparent bg-tertiary py-2 px-4 text-3x1 font-medium text-white hover:bg-primary hover:font-semibold hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-violet-700 group-hover:text-violet-600"
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

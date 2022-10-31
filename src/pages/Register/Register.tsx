import { UserPlusIcon } from "@heroicons/react/20/solid";
import ReCAPTCHA from "react-google-recaptcha";
import registerImg from "../../assets/register.png";
import FloatInput from "../../components/Inputs/FloatInput";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      cpassword: yup.string().when("password", {
        is: (password: string) => password,
        then: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match!"),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
      // formik.setErrors({ username: "aaa" });

      // jwtService
      //   .signInWithUsernameAndPassword(values.username, values.password)
      //   .then((user) => {
      //     localStorage.setItem("authUser", JSON.stringify(user));
      //     setUser(user);
      //     props.history.push("/");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     messageService.errorMessage("Email e/ou senha inválido(s)");
      //   });
    },
  });

  return (
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
        <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="py-1.5">
              <FloatInput
                id="name"
                name="name"
                type="text"
                required
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                errors={formik.errors.name}
              />
            </div>
            {/* <div className="py-1.5">
              <FloatInput
                id="username"
                name="username"
                type="text"
                required
                label="Username"
                value={formik.values.username}
                onChange={(e) => {
                  let username = e.target.value.replace(
                    /[^a-z0-9_-]+|\s+/gim,
                    ""
                  );
                  formik.setFieldValue("username", username);
                }}
                errors={formik.errors.username}
              />
            </div> */}
            <div className="py-1.5">
              <FloatInput
                id="email"
                name="email"
                type="email"
                required
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errors={formik.errors.email}
              />
            </div>
            <div className="py-1.5">
              <FloatInput
                id="password"
                name="password"
                type="password"
                required
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                errors={formik.errors.password}
              />
            </div>
            <div className="py-1.5">
              <FloatInput
                id="cpassword"
                name="cpassword"
                type="password"
                required
                label="Confirm Password"
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                errors={formik.errors.cpassword}
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
  );
}

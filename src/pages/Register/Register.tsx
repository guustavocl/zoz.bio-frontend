import { UserPlusIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import registerImg from "../../assets/register.png";
import ZozInput from "../../components/Inputs";
import userService from "../../services/user.service";
import * as yup from "yup";

const Register = () => {
  const { errorToast, successToast } = useToasts();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      uname: "",
      email: "",
      password: "",
      cpassword: "",
      recaptcha: "",
    },
    validationSchema: yup.object({
      uname: yup.string().required("Name is required"),
      email: yup
        .string()
        .required("Email is required")
        .email("Must be a valid email"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Must be at least 6 characters length"),
      cpassword: yup
        .string()
        .required("Must confirm your password")
        .when("password", {
          is: (password: string) => password,
          then: yup
            .string()
            .min(6, "Must be at least 6 digits")
            .oneOf([yup.ref("password"), null], "Passwords must match!"),
        }),
    }),
    onSubmit: (values) => {
      userService
        .register(values)
        .then((response) => {
          formik.resetForm();
          successToast(response.message);
          navigate("/login");
        })
        .catch((error) => {
          errorToast(error.message);
          if (error.errors) formik.setErrors(error.errors);
        });
    },
  });

  return (
    <div className="flex min-h-full items-center justify-center py-1 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="w-full max-w-md">
        <div>
          <img
            className="mx-auto h-32 sm:h-48 md:h-56"
            src={registerImg}
            alt="register image"
            loading="lazy"
          />
          <h2 className="pt-1 text-center text-2xl font-bold tracking-tight text-gray-300">
            Sign up to link all your socials in one place! :)
          </h2>
        </div>
        <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="py-1">
              <ZozInput
                id="uname"
                name="uname"
                type="text"
                label="Name"
                size={50}
                value={formik.values.uname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={
                  formik.touched.uname && formik.errors.uname
                    ? formik.errors.uname
                    : undefined
                }
              />
            </div>
            <div className="py-1">
              <ZozInput
                id="email"
                name="email"
                type="email"
                label="Email"
                size={50}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />
            </div>
            <div className="py-1">
              <ZozInput
                id="password"
                name="password"
                type="password"
                label="Password"
                size={40}
                minSize={6}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />
            </div>
            <div className="py-1">
              <ZozInput
                id="cpassword"
                name="cpassword"
                type="password"
                label="Confirm Password"
                size={40}
                minSize={6}
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={
                  formik.touched.cpassword && formik.errors.cpassword
                    ? formik.errors.cpassword
                    : undefined
                }
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
              disabled={formik.isSubmitting}
              className="group relative flex w-full justify-center rounded border border-transparent bg-violet-700 py-2 px-4 text-3x1 font-medium text-white hover:bg-violet-900 hover:font-semiboldfocus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0"
            >
              <span className="absolute left-0 flex items-center pl-3">
                <UserPlusIcon
                  className="h-5 w-5 text-gray-300 group-hover:text-violet-600"
                  aria-hidden="true"
                />
              </span>
              Create account
            </button>
            <p className="mt-1 text-center text-xs text-gray-300">
              {"By signing up, you agree to the "}
              <a
                href="/terms"
                rel="noopener noreferrer"
                className="font-medium text-violet-600 hover:text-violet-700"
              >
                Terms of Service
              </a>
              {" and "}
              <a
                href="/privacy"
                rel="noopener noreferrer"
                className="font-medium text-violet-600 hover:text-violet-700"
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <p className="mt-2 text-center text-2x1 text-gray-300">
            {"Already have an account? "}
            <a
              href="/login"
              rel="noopener noreferrer"
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Log in.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

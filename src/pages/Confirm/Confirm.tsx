import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ZozInput } from "../../components/Inputs";
import userService from "../../services/user.service";
import * as yup from "yup";

const Confirm = () => {
  const navigate = useNavigate();
  const { errorToast, successToast } = useToasts();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (email && token) {
      userService
        .confirmEmail(email, token)
        .then((response) => {
          setIsConfirmed(response && response.confirmated);
        })
        .catch((error) => {
          errorToast(error && error.message ? error.message : error);
        });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: email ? email : "",
      recaptcha: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Must be a valid email"),
    }),
    onSubmit: (values) => {
      userService
        .sendConfirmEmail(values.email)
        .then((response) => {
          formik.resetForm();
          successToast(response.message);
          navigate("/");
        })
        .catch((error) => {
          errorToast(error.message);
          if (error.errors) formik.setErrors(error.errors);
        });
    },
  });

  return (
    <React.Fragment>
      <div className="flex min-h-full items-center justify-center py-1 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md pt-20">
          {isConfirmed ? (
            <h2 className="pt-1 text-center text-2xl font-bold tracking-tight text-gray-300">
              Email successfully confirmed
            </h2>
          ) : (
            <React.Fragment>
              <div>
                {/* <img
                  className="mx-auto h-32 sm:h-48 md:h-56"
                  src={registerImg}
                  alt="Register svg"
                  loading="lazy"
                /> */}
                <h2 className="pt-1 text-center text-2xl font-bold tracking-tight text-gray-300">
                  {email && token
                    ? "Confirmation failed, maybe you link has expired? Try sending a new link"
                    : "Inform your email address to send a new confirmation link"}
                </h2>
              </div>
              <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
                <div className="-space-y-px rounded-md shadow-sm">
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
                    className="group relative flex w-full justify-center rounded border border-transparent bg-tertiary py-2 px-4 text-3x1 font-medium text-white hover:bg-gray-700 hover:font-semibold hover:text-violet-600 focus:outline-none "
                  >
                    <span className="absolute left-0 flex items-center pl-3">
                      <UserIcon
                        className="h-5 w-5 text-violet-700 group-hover:text-violet-500"
                        aria-hidden="true"
                      />
                    </span>
                    Send confirmation link
                  </button>
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Confirm;

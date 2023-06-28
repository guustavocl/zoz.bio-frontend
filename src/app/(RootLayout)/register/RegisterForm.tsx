"use client";
import { Button, Link } from "@/components/Buttons";
import { Input } from "@/components/Inputs";
import { createAccount } from "@/services/AccountService";
import { UserProps } from "@/types/UserProps";
import { errorToast, successToast } from "@/utils/toaster";
import { PlusIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z
  .object({
    uname: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Insert a valid email").toLowerCase(),
    password: z.string().nonempty("Password is required").min(6, "Must be at least 6 characters length"),
    cpassword: z.string().nonempty("Confirm Password is required").min(6, "Must be at least 6 characters length"),
    recaptcha: z.string().nonempty(),
  })
  .refine(data => data.password === data.cpassword, {
    message: "Passwords must match!",
    path: ["cpassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>({ resolver: zodResolver(registerFormSchema) });

  const recaptchaRef = createRef<ReCAPTCHA>();

  const submitRegister = (data: UserProps) => {
    createAccount(data)
      .then(() => {
        reset();
        successToast("Account successfully created, please check you email to confirm your account");
        router.push("/login");
      })
      .catch(err => {
        errorToast(err);
      })
      .finally(() => {
        // TODO - this inst working, fix it
        recaptchaRef.current?.reset();
      });
  };

  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  if (!recaptchaKey) return null;

  return (
    <form className="w-full space-y-2 px-4" onSubmit={handleSubmit(submitRegister)}>
      <div className="-space-y-px rounded-md shadow-sm mb-2">
        <Input
          id="uname"
          type="text"
          label="Name"
          register={register("uname")}
          errorMessage={errors.uname?.message}
          minSize={2}
          size={50}
        />
        <Input
          id="email"
          type="text"
          label="Email"
          register={register("email")}
          errorMessage={errors.email?.message}
          minSize={6}
          size={50}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register("password")}
          errorMessage={errors.password?.message}
          minSize={6}
          size={40}
        />
        <Input
          id="cpassword"
          type="password"
          label="Confirm Password"
          register={register("cpassword")}
          errorMessage={errors.cpassword?.message}
          minSize={6}
          size={40}
        />
      </div>
      <div className="flex items-center justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaKey}
          onChange={(value: string | null) => {
            if (value) setValue("recaptcha", value);
          }}
        />
      </div>

      <Button
        id="sign-in-btn"
        type="submit"
        label="Sign Up"
        iconAdornment={<PlusIcon className="h-5 w-5 text-violet-300 group-hover:text-violet-400" aria-hidden="true" />}
      />
      <Link
        href="/login"
        label="Sign In if you already have an account"
        className="font-medium text-violet-600 text-center w-full"
      />
    </form>
  );
}

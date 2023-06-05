"use client";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button, Link } from "@/components/Buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Inputs";
import { z } from "zod";
import { useEffect } from "react";
import { LoginProps } from "@/types/LoginProps";
import { login } from "@/services/AuthService";

const loginFormSchema = z.object({
  email: z.string().nonempty("Email is required").email("Insert a valid email").toLowerCase(),
  password: z.string().nonempty("Password is required"),
  remember: z.boolean(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginFormSchema) });

  useEffect(() => {
    const json = localStorage.getItem("rl");
    if (json) {
      const rememberInfos: LoginProps = JSON.parse(json);
      setValue("email", rememberInfos?.email || "");
      setValue("remember", rememberInfos?.remember || false);
    }
  }, []);

  const createUser = (data: LoginFormData) => {
    login(data.email, data.password)
      .then(res => {
        if (res.user) {
          if (data.remember) localStorage.setItem("rl", JSON.stringify({ email: data.email, remember: data.remember }));
          setCookie("zoz_user", res.user);
          router.refresh();
          router.push("/account");
        }
      })
      .catch(err => {
        // TODO TOASTER
        console.log(err);
      });
  };

  return (
    <form className="mt-4 w-full space-y-2" onSubmit={handleSubmit(createUser)}>
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="py-1">
          <Input
            id="email"
            type="text"
            label="Email"
            register={register("email")}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="py-1">
          <Input
            id="password"
            type="password"
            label="Password"
            register={register("password")}
            errorMessage={errors.password?.message}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0"
            {...register("remember")}
          />
          <label htmlFor="remember-me" className="text-2x1 ml-2 block text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-2x1">
          <Link href="#" label="Forgot your password?" className="font-medium text-gray-300" />
        </div>
      </div>

      <Button
        id="sign-in-btn"
        type="submit"
        label="Sign in"
        iconAdornment={
          <LockClosedIcon className="h-5 w-5 text-violet-300 group-hover:text-violet-400" aria-hidden="true" />
        }
      />
    </form>
  );
}

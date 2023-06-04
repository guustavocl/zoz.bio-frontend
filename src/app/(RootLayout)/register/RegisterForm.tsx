"use client";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  email: z.string().nonempty("Email is required").email("Insert a valid email").toLowerCase(),
  password: z.string().min(6, "Password must have at least 6 digits"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function RegisterForm() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({ resolver: zodResolver(createUserFormSchema) });

  function createUser(data: any) {
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <>
      <form className="mt-4 w-full space-y-2" onSubmit={handleSubmit(createUser)}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div className="flex flex-col py-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              {...register("email")}
              className="rounded border border-zinc-200 bg-zinc-700 px-1 shadow-sm"
            />
            <span>{errors.email?.message}</span>
          </div>
          <div className="flex flex-col py-1">
            <label htmlFor="password">Email</label>
            <input
              type="password"
              {...register("password")}
              className="rounded border border-zinc-200 bg-zinc-700 px-1 shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0"
            />
            <label htmlFor="remember-me" className="text-2x1 ml-2 block text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-2x1">
            <a href="#" rel="noopener noreferrer" className="font-medium text-gray-300 hover:text-violet-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="text-3x1 group relative mt-4 flex w-full justify-center rounded border border-transparent bg-violet-700 px-4 py-2 font-medium text-white hover:bg-violet-900 hover:font-semibold focus:outline-none"
          >
            <span className="absolute left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-gray-300 group-hover:text-violet-600" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
      <pre>{output}</pre>
    </>
  );
}

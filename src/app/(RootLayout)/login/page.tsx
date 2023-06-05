import LoginForm from "./LoginForm";
import Redirect from "@/components/Redirect/Redirect";
import { Link } from "@/components/Buttons";
import { cookies } from "next/headers";

export default function LoginPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user) return <Redirect path="/account" />;
  else
    return (
      <main className="mx-8 flex w-full flex-col items-center justify-between pb-24 md:mx-14 lg:max-w-6xl">
        <div className="mt-6 pb-20 md:mt-12">
          <img className="mx-auto h-48 sm:h-64" src={"/login.png"} alt="login image" loading="lazy" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">
            Sign in to edit your pages
          </h2>
          <p className="text-2x1 mt-2 text-center text-gray-300">
            or <Link href="register" label="click here to create your account" className="text-violet-500" />
          </p>
          <LoginForm />
        </div>
      </main>
    );
}

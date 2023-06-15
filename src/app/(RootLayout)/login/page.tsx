import { Link } from "@/components/Buttons";
import Main from "@/components/Main/Main";
import Redirect from "@/components/Redirect/Redirect";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user) return <Redirect path="/account" />;
  else
    return (
      <Main className="pb-24">
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
      </Main>
    );
}

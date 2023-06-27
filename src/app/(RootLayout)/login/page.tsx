import { Link } from "@/components/Buttons";
import Main from "@/components/Main/Main";
import Redirect from "@/components/Redirect/Redirect";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function LoginPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user) return <Redirect path="/account" />;
  else
    return (
      <Main className="mb-24 mt-12 md:mb-16 md:mt-6 sm:w-[30rem]">
        <Image
          src={"/login.png"}
          width={200}
          height={200}
          quality={50}
          priority={true}
          className="mx-auto h-48 md:h-36 2xl:h-64 w-auto"
          alt="login image"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">Sign In to edit your pages</h2>
        <p className="text-2x1 mt-2 text-center text-gray-300">
          or <Link href="register" label="click here to create your account" className="text-violet-500" />
        </p>
        <LoginForm />
      </Main>
    );
}

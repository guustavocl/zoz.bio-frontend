// import { Link } from "@/components/Buttons";
import Main from "@/components/Main/Main";
import Redirect from "@/components/Redirect/Redirect";
import { cookies } from "next/headers";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user) return <Redirect path="/account" />;
  else
    return (
      <>
        <Main className="sm:w-[33rem]">
          {/* TODO - find a better register image, bigger size on 2xl: */}

          <div className="relative px-4 py-10 my-[5rem]">
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-300">
              Sign Up to link all your socials <br />
              in one place! :)
            </h2>
            <RegisterForm />
          </div>
        </Main>
      </>
    );
}

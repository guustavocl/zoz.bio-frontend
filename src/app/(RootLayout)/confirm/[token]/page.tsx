import { Link } from "@/components/Buttons";
import Main from "@/components/Main/Main";
import Redirect from "@/components/Redirect";
import { confirmEmail } from "@/services/AccountService";
import { cookies } from "next/headers";
import Image from "next/image";
import ConfirmationButton from "./ConfirmationButton";

export default async function ConfirmPage({ params }: { params: { token: string } }) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  let confirmated = false;
  try {
    const req = await confirmEmail(params.token);
    confirmated = req.confirmated;
  } catch (err) {
    confirmated = false;
  }

  if (user?.isEmailConfirmed) return <Redirect path="/account" />;

  return (
    <Main className="my-32 sm:w-[30rem]">
      <Link href="https://storyset.com/user" className="w-full">
        <Image
          src={"/confirm.gif?v=3"}
          width={200}
          height={200}
          quality={50}
          priority={true}
          className="mx-auto h-48 sm:h-72 w-auto"
          alt="login image"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
      </Link>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">Account confirmation</h2>
      {confirmated ? (
        <h3 className="text-xl mt-2 text-center text-gray-300">
          Account has been successfully confirmed{" "}
          {user ? (
            <Link href="/account" label="Click here to go to your account panel" className="text-xl text-violet-500" />
          ) : (
            <Link href="/login" label="Click here to Sign In" className="text-xl text-violet-500" />
          )}
        </h3>
      ) : (
        <h3 className="text-xl mt-2 text-center text-gray-300">
          Token invalid or expired{" "}
          {user ? (
            <ConfirmationButton email={user.email} />
          ) : (
            <Link href="/login" label="Sign in to send a new confirmation email" className="text-xl text-violet-500" />
          )}
        </h3>
      )}
    </Main>
  );
}

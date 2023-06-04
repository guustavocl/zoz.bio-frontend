import Head from "next/head";
import { cookies } from "next/headers";
import Redirect from "@/components/Redirect";

export default function Account() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  const auth = authCookie ? JSON.parse(authCookie?.value) : undefined;

  if (auth)
    return (
      <>
        <Head>
          <title>Account</title>
          <meta property="og:title" content="My Account" key="title" />
        </Head>
        <main className="flex flex-col items-center justify-between p-24">Account page!! {auth?.location}</main>
      </>
    );
  else return <Redirect />;
}

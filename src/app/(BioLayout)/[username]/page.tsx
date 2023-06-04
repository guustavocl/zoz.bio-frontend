import { Link } from "@/components/Buttons";
import Head from "next/head";

export default function About({ params }: { params: { username: string } }) {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <main className="flex flex-col items-center justify-between p-24">
        usernamew: {params.username}
        <Link href="teste" label="teste" />
      </main>
    </>
  );
}

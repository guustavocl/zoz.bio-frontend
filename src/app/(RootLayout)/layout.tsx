import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import NextTopLoader from "nextjs-toploader";
import { cookies } from "next/headers";
import { Metadata } from "next";
import "./../globals.css";

// export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
//   try {
//     console.log("get server props");
//     const result = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
//     const data = await result.json();
//     console.log(data);
//     return {
//       props: { data },
//     };
//   } catch {
//     res.statusCode = 404;
//     return {
//       props: {},
//     };
//   }
// };

export const metadata: Metadata = {
  title: "zoz.bio - All links in one place",
  description:
    "Create and share your own page, build a clean and organized profile bio to aggregate all your social medias and links in one place. Join ZOZ today, it's free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  const auth = authCookie ? JSON.parse(authCookie?.value) : undefined;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {/* <title key="title">zoz.bio - All links in one place</title> */}
        <meta name="title" content="zoz.bio - All links in one place" />
        {/* <meta
          name="description"
          content="Create and share your own page, build a clean and organized profile bio to aggregate all your social medias and links in one place. Join ZOZ today, it's free."
        /> */}
        <meta name="google" content="notranslate" />
        {/* <!-- Open Graph / Facebook --> */}
        <meta name="og:site_name" content="zoz.bio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zoz.bio/" />
        <meta property="og:title" content="zoz.bio - All links in one place" />
        <meta
          property="og:description"
          content="Create and share your own page, build a clean and organized profile bio to aggregate all your social medias and links in one place. Join ZOZ today, it's free."
        />
        <meta property="og:image" content="https://zoz.bio/metabg.png?v=2" />
        <meta property="og:image:alt" content="zoz.bio logo with a dark background" />
        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@guustavocl" />
        <meta name="twitter:creator" content="@guustavocl" />
        <meta property="twitter:url" content="https://zoz.bio/" />
        <meta property="twitter:title" content="zoz.bio - All links in one place" />
        <meta
          property="twitter:description"
          content="Create and share your own page, build a clean and organized profile bio to aggregate all your social medias and links in one place. Join ZOZ today, it's free."
        />
        <meta property="twitter:image" content="https://zoz.bio/metabg.png?v=2" />
        <meta property="twitter:image:src" content="https://zoz.bio/metabg.png?v=2" />

        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <NextTopLoader color="#6d28d9" showSpinner={false} />
        <Header auth={auth} />
        <div className="flex w-full flex-row justify-center">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

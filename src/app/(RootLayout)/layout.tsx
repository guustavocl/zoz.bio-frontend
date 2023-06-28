import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header";
import ToastProvider from "@/providers/ToastProvider";
import { ZOZ_META_DESCRIPTION, ZOZ_META_TITLE } from "@/utils/Constants";
import { Metadata } from "next";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: ZOZ_META_TITLE,
  description: ZOZ_META_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  return (
    <html lang="en">
      <head>
        {/* <title key="title">zoz.bio - All links in one place</title> */}
        <meta name="title" content={ZOZ_META_TITLE} />
        <meta name="theme-color" content="#000000" />
        {/* <meta
          name="description"
          content={ZOZ_META_DESCRIPTION}
        /> */}
        <meta name="google" content="notranslate" />
        {/* <!-- Open Graph / Facebook --> */}
        <meta name="og:site_name" content="zoz.bio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zoz.bio/" />
        <meta property="og:title" content={ZOZ_META_TITLE} />
        <meta property="og:description" content={ZOZ_META_DESCRIPTION} />
        <meta property="og:image" content="https://zoz.bio/metabg.png?v=3" />
        <meta property="og:image:alt" content="zoz.bio logo with a dark background" />
        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@guustavocl" />
        <meta name="twitter:creator" content="@guustavocl" />
        <meta property="twitter:url" content="https://zoz.bio/" />
        <meta property="twitter:title" content={ZOZ_META_TITLE} />
        <meta property="twitter:description" content={ZOZ_META_DESCRIPTION} />
        <meta property="twitter:image" content="https://zoz.bio/metabg.png?v=3" />
        <meta property="twitter:image:src" content="https://zoz.bio/metabg.png?v=3" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextTopLoader color="#6d28d9" showSpinner={false} />
        <Header user={user} />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}

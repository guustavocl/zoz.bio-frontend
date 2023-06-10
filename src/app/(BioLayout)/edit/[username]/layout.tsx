// import Script from "next/script";
import "@/app/globals.css";
import { getPage } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { ZOZ_META_DESCRIPTION, ZOZ_META_TITLE } from "@/utils/Constants";

export async function generateMetadata({ params }: { params: { username: string; page: PageProps } }) {
  try {
    const res = await getPage(params.username);
    if (res?.page) {
      return {
        title: `Username: ${params.username}`,
        description: res.page.bio || ZOZ_META_DESCRIPTION,
        // openGraph: {
        //   images: ['/some-specific-page-image.jpg', ...previousImages],
        // },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    title: ZOZ_META_TITLE,
    description: ZOZ_META_DESCRIPTION,
  };
}

export default function BioLayout({ children }: { children: React.ReactNode }) {
  //TODO OG GRAPH IMAGE TWITTER E FB
  //TODO GOOGLE ANALYTICS
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Gustavo" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

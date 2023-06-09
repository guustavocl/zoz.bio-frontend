import "@/app/globals.css";
import { getPage } from "@/services/PageService";
import { ZOZ_META_DESCRIPTION, ZOZ_META_TITLE } from "@/utils/Constants";

export async function generateMetadata() {
  try {
    const res = await getPage("gustavo");
    if (res?.page) {
      return {
        title: `Username: gustavo`,
        description: res.page.bio || ZOZ_META_DESCRIPTION,
        // openGraph: {
        //   images: ['/some-specific-page-image.jpg', ...previousImages],
        // },
      };
    }
  } catch (error) {
    console.log(error);
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

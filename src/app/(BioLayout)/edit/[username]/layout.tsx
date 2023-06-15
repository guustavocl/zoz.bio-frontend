// import Script from "next/script";
import ToastProvider from "@/providers/ToastProvider";
import "@/app/globals.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/themes/translucent.css";
import "react-toastify/dist/ReactToastify.css";
// METADATA EXAMPLE - https://nextjs.org/docs/app/api-reference/functions/generate-metadata

export default function BioLayout({ children }: { children: React.ReactNode }) {
  //TODO - OG GRAPH IMAGE TWITTER E FB
  //TODO - GOOGLE ANALYTICS
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
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}

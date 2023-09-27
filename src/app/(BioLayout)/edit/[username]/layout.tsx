// import Script from "next/script";
import "@/app/(BioLayout)/biolayout.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";
import ToastProvider from "@/providers/ToastProvider";
import { ReactNode } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// METADATA EXAMPLE - https://nextjs.org/docs/app/api-reference/functions/generate-metadata

export default function BioLayout({ children }: { children: ReactNode }) {
  //TODO - OG GRAPH IMAGE TWITTER E FB
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
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_HOME && (
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_HOME} />
        )}
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}

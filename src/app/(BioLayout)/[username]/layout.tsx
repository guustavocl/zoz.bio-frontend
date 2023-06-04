// import Script from "next/script";
import "./../../globals.css";

export async function generateMetadata({ params }: { params: { username: string } }) {
  return {
    title: `Username: ${params.username}`,
  };
}

export default function BioLayout({ children, params }: { children: React.ReactNode; params: { username: string } }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content="guustavocl, Gustavo, web developer, github, typescript" />
        <meta name="description" content="Gustavo's personal website" />
        <meta name="author" content="Gustavo" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      {/* <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-J7WSGXYBMQ" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J7WSGXYBMQ', {
              page_path: window.location.pathname,
          });
          `,
        }}
      /> */}
      <body>
        {params.username} page45 layout{children}
      </body>
    </html>
  );
}

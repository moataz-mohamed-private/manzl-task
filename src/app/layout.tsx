import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import NavMenu from "./_components/navMenu";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Manzel TMDB",
  description: "Just a task",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-black">
        <NextTopLoader
          color={"#6D28D9"}
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={`0 0 10px #6D28D9,0 0 5px white`}
        />
        <div>
          <NavMenu />
        </div>
        <div className="p-4">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}

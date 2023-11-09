import type { Metadata } from "next";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import "@/scss/globals.scss";
import { StoreProvider } from "@/store/store";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artigem Streamline",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

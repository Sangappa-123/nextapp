import type { Metadata } from "next";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import "@/scss/globals.scss";
import { StoreProvider } from "@/store/store";
import { Locale } from "@/i18n.config";
import NotifyMessage from "@/components/common/NotifyMessage";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artigem Streamline",
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <StoreProvider lang={params.lang}>
          <NotifyMessage />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

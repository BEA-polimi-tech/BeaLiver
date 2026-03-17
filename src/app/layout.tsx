import type { Metadata } from "next";

import "./global.css";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Biomedical Engineering Association - PoliMI",
  openGraph: {
    title: "Biomedical Engineering Association - PoliMI",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("header");
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-[#010017]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[#010017] bg-[url('/Images/background.png')] bg-cover bg-[center_top] bg-no-repeat"
        />
        <div className="relative z-10 w-full mx-auto px-5 md:max-w-3xl md:px-6 lg:max-w-5xl lg:px-10 xl:max-w-[1200px] xl:px-12">
          <Header settings={settings} />
          <main>{children}</main>
          <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-400">
            <p>Biomedical Engineering Association - PoliMI</p>
            <p className="mt-2 text-xs text-gray-500">&copy; {currentYear}</p>
          </footer>
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}

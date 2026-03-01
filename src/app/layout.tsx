import "./global.css";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import Header from "./Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("header");

  return (
    <html lang="en">
      <body className="bg-[url('/Images/background.png')] bg-cover bg-top min-h-screen">
        <div className="w-full mx-auto px-5 md:max-w-3xl md:px-6 lg:max-w-5xl lg:px-10 xl:max-w-[1200px] xl:px-12">
          <Header settings={settings} />
          <main>{children}</main>
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}

import { type Metadata } from "next";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "contacts");

  // <SliceZone> renders the page's slices.
  return <SliceZone slices={home.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "contacts");

  return {
    description: home.data.meta_description,
    openGraph: {
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

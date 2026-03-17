import { type Metadata } from "next";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const [heroSlice, ...remainingSlices] = home.data.slices;

  return (
    <>
      {heroSlice ? <SliceZone slices={[heroSlice]} components={components} /> : null}
      {remainingSlices.length > 0 ? (
        <div id="home-after-hero">
          <SliceZone slices={remainingSlices} components={components} />
        </div>
      ) : null}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    description: home.data.meta_description,
    openGraph: {
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type WelcomeProps = SliceComponentProps<Content.WelcomeSlice>;

const Welcome: FC<WelcomeProps> = ({ slice }) => {
  return (
    <>
      <div className="-mt-2 md:-mt-4 lg:-mt-6 flex flex-col lg:flex-row mx-auto justify-between items-center pb-10 lg:pb-20 gap-8 lg:gap-0">
        <span className="p-0 md:p-4 lg:p-6 text-white text-center lg:text-left">
          <div className="text-gray-400 pb-3 text-sm">
            <PrismicRichText field={slice.primary.above_title} />
          </div>

          <div className="home-hero-title text-3xl md:text-4xl lg:text-5xl pb-4">
            <PrismicRichText field={slice.primary.title} />
          </div>

          <div className="text-sm md:text-base text-gray-100">
            <PrismicRichText field={slice.primary.under_title} />
          </div>
        </span>

        <span className="w-full lg:w-auto flex justify-center">
          <PrismicNextImage
            field={slice.primary.image}
            className="max-w-[280px] md:max-w-[350px] lg:max-w-none"
          />
        </span>
      </div>
      <div>
        <a
          href="#home-who-we-are"
          className="group mt-16 md:mt-24 lg:mt-36 inline-flex w-full flex-col items-center text-white transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:opacity-80"
          aria-label="Find out more"
        >
          <div className="mx-auto text-center text-sm font-light">
            <PrismicRichText field={slice.primary.find_out_more} />
          </div>
          <div className="mt-2 transition-transform duration-300 group-hover:translate-y-1 group-focus-visible:translate-y-1">
            <PrismicNextImage
              className="mx-auto"
              field={slice.primary.find_out_more_arrow}
            />
          </div>
        </a>
      </div>
    </>
  );
};

export default Welcome;

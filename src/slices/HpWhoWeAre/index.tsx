import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type HpAboutProps = SliceComponentProps<Content.HpAboutSlice>;

const HpAbout: FC<HpAboutProps> = ({ slice }) => {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="text-gray-400 text-sm mx-auto text-center mb-2">
        <PrismicRichText field={slice.primary.above_title} />
      </div>

      <div className="text-white text-xl md:text-2xl font-light text-center">
        <PrismicRichText field={slice.primary.title} />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6 pt-8 md:pt-10 font-light">
        <div className="w-full md:w-1/2">
          <PrismicNextImage
            field={slice.primary.image}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-white p-0 md:p-4">
          <div className="text-xl md:text-2xl mb-4 md:mb-8">
            <PrismicRichText field={slice.primary.cardtitle} />
          </div>

          <div className="text-sm md:text-base mb-6 [&_p]:mb-4">
            <PrismicRichText field={slice.primary.description} />
          </div>

          <div>
            <PrismicNextLink
              field={slice.primary.button}
              className="group inline-flex items-center gap-2 border border-white rounded-lg px-6 py-2 hover:bg-white hover:text-black transition-colors text-sm md:text-base"
            >
              Who we are
              <span className="text-lg font-bold transition-transform group-hover:translate-x-1">
                &#8594;
              </span>
            </PrismicNextLink>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 bg-white/10 rounded-2xl backdrop-blur-sm mx-auto w-full md:w-2/3 p-5 md:p-7">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center">
            <PrismicRichText field={slice.primary.below_card_title} />
          </div>

          <PrismicNextLink
            field={slice.primary.below_card_button}
            className="group shrink-0 inline-flex items-center gap-2 border text-sm border-white rounded-lg px-6 py-2 text-white hover:bg-white hover:text-black transition-colors"
          >
            Discover our vision
            <span className="text-lg font-bold transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </PrismicNextLink>
        </div>
      </div>
    </div>
  );
};

export default HpAbout;

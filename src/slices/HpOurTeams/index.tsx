import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type HpJoinUsProps = SliceComponentProps<Content.HpJoinUsSlice>;

const HpJoinUs: FC<HpJoinUsProps> = ({ slice }) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 w-full">
      <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4">
        <div className="text-gray-400 text-sm">
          <PrismicRichText field={slice.primary.abovetitle} />
        </div>
        <div className="text-white text-xl md:text-2xl font-light uppercase tracking-wide">
          <PrismicRichText field={slice.primary.title} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto items-start">
        {slice.primary.cards.map((card, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col hover:bg-white/10 transition-colors duration-300"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-6 md:mb-8">
              <PrismicNextImage
                field={card.image}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="w-20 h-px bg-white mb-4 md:mb-6"></div>

            <div className="text-gray-300 text-sm leading-relaxed font-light">
              <PrismicRichText field={card.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HpJoinUs;

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `VisionCards`.
 */
export type VisionCardsProps = SliceComponentProps<Content.VisionCardsSlice>;

/**
 * Component for "VisionCards" Slices.
 */
const VisionCards: FC<VisionCardsProps> = ({ slice }) => {
  const { cards } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 lg:space-y-12"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row gap-8 items-center ${
            index === 1 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Colonna Immagine */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-video overflow-hidden rounded-lg">
              <PrismicNextImage
                field={card.image}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Colonna Testo */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">
              <PrismicRichText field={card.title} />
            </div>
            <div className="text-sm md:text-base text-gray-300">
              <PrismicRichText field={card.body} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};


export default VisionCards;

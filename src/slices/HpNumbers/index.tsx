import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Fragment } from "react";

export type HpBandaProps = SliceComponentProps<Content.HpBandaSlice>;

const HpBanda: FC<HpBandaProps> = ({ slice }) => {
  return (
    <section
      className="w-full rounded-2xl md:rounded-3xl border-white border py-8 md:py-12 lg:py-16"
      style={{ backgroundColor: "#010017" }}
    >
      <div className="mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-6 md:gap-0 text-center">
          {slice.primary.field.map((item, index) => (
            <Fragment key={index}>
              <div className="flex flex-col items-center flex-1 w-full">
                <div className="text-white text-3xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
                  <PrismicRichText field={item.number} />
                </div>
                <div className="text-gray-400 text-xs md:text-sm font-light">
                  <PrismicRichText field={item.description} />
                </div>
              </div>

              {index !== slice.primary.field.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-white mx-4 self-center"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HpBanda;

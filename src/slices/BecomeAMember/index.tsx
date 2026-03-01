import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type BecomeAMemberProps = SliceComponentProps<Content.BecomeAMemberSlice>;

const BecomeAMember: FC<BecomeAMemberProps> = ({ slice }) => {
  const isWithQR = slice.variation === "withQr";

  return (
    <section className="py-12 md:py-16 lg:py-24 w-full">
      <div>
        {/* Header Sezione */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2">
          <div className="text-gray-400 text-sm">
            <PrismicRichText field={slice.primary.abovetitle} />
          </div>
          <div className="text-white text-xl md:text-2xl uppercase">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </div>

        {/* Container Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          {/* Card Sinistra: Base Member */}
          <div className="p-6 md:p-8 lg:p-12 flex flex-col">
            <div className="space-y-4">
              <div className="text-white text-xl md:text-2xl uppercase tracking-wide">
                <PrismicRichText field={slice.primary.membertitle} />
              </div>
              {isWithQR && slice.primary.memberqr && (
                <div className="flex justify-center">
                  <div className="w-40 h-40">
                    <PrismicNextImage
                      field={slice.primary.memberqr}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6 md:space-y-10 mt-8 md:mt-12">
              {slice.primary.basemember.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-1">
                  <div className="shrink-0">
                    <PrismicNextImage
                      field={item.icon}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="text-gray-200 text-base md:text-lg font-light">
                    <PrismicRichText field={item.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Destra: Bealiver (ANIMATA IN HOVER) */}
          <div className="relative group p-6 md:p-8 lg:p-12 rounded-xl overflow-hidden bg-[url('/Images/memberBg.png')] bg-cover bg-top shadow-2xl transition-all duration-500 ease-out hover:shadow-red-900/20 hover:scale-[1.02]">
            {/* Effetto luce rossa che si intensifica in hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-red-500/40 group-hover:scale-150"></div>

            <div className="relative z-10">
              <div className="space-y-4">
                <div className="text-white text-xl md:text-2xl uppercase tracking-wide">
                  <PrismicRichText field={slice.primary.bealivertitle} />
                </div>
                {isWithQR && slice.primary.bealiverqr && (
                  <div className="flex justify-center">
                    <div className="w-40 h-40">
                      <PrismicNextImage
                        field={slice.primary.bealiverqr}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-gray-400 text-xs uppercase tracking-widest mb-6 md:mb-10 mt-4">
                <PrismicRichText field={slice.primary.bealiver_under_title} />
              </div>

              <div className="space-y-6 md:space-y-10">
                {slice.primary.believer.map((item, index) => (
                  <div key={index} className="flex flex-col items-start gap-1">
                    <div className="shrink-0">
                      <PrismicNextImage
                        field={item.icon}
                        className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1"
                      />
                    </div>
                    <div className="text-gray-200 text-base md:text-lg font-light">
                      <PrismicRichText field={item.description} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottone Join Us */}
        {!isWithQR && (
          <div className="text-center">
            <PrismicNextLink
              field={slice.primary.join_us}
              className="inline-block border border-white/50 rounded-md px-8 md:px-10 py-3 text-white text-base md:text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              JOIN US
            </PrismicNextLink>
          </div>
        )}
      </div>
    </section>
  );
};

export default BecomeAMember;

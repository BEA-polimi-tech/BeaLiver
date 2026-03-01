import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type SupportUsProps = SliceComponentProps<Content.SupportUsSlice>;

const SupportUs: FC<SupportUsProps> = ({ slice }) => {
  const { body, buttontext, link } = slice.primary;
  
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-4 pb-12 md:pb-16 lg:pb-20 px-0 md:px-10 lg:px-20 xl:px-40"
    >
      <div className="max-w-4xl mx-auto">
        {/* Container con sfondo trasparente e blur */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 md:p-6 lg:p-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 md:gap-6">
            {/* Testo con gradiente */}
            <div className="text-base md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center md:text-left">
              <PrismicRichText field={body} />
            </div>

            {/* Bottone */}
            <PrismicNextLink
              field={link}
              className="whitespace-nowrap px-8 py-3 border-2 border-white/50 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              <PrismicRichText field={buttontext} />
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportUs;

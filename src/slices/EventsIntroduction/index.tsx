import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type EventsIntroductionProps =
  SliceComponentProps<Content.EventsIntroductionSlice>;

const EventsIntroduction: FC<EventsIntroductionProps> = ({ slice }) => {
  const {
    above_title,
    title,
    events_description,
    tracks_title,
    tracks_description,
  } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-white"
    >
      {above_title && (
        <div className="text-center text-gray-400 pt-8 text-sm md:pt-10 lg:pt-12 mb-3 md:mb-4">
          <PrismicRichText field={above_title} />
        </div>
      )}
      <div className="text-center neutralFace text-xl md:text-2xl mb-10 md:mb-12 lg:mb-14">
        <PrismicRichText field={title} />
      </div>
      <div className="text-sm md:text-base mb-10 md:mb-12 lg:mb-16">
        <PrismicRichText field={events_description} />
      </div>
      <div className="text-lg md:text-xl mb-4 md:mb-5 lg:mb-6">
        <PrismicRichText field={tracks_title} />
      </div>
      <div className="text-sm md:text-base mb-10 md:mb-16">
        <PrismicRichText field={tracks_description} />
      </div>
    </section>
  );
};

export default EventsIntroduction;

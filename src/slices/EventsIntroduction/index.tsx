import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type EventsIntroductionProps =
  SliceComponentProps<Content.EventsIntroductionSlice>;

const EventsIntroduction: FC<EventsIntroductionProps> = ({ slice }) => {
  const {above_title, title, events_description, tracks_title, tracks_description} = slice.primary;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-white"
    >
      <div className="text-center text-gray-400 mb-4 text-sm">
        <PrismicRichText field={above_title} />
      </div>
      <div className="text-center neutralFace text-xl md:text-2xl mb-6 md:mb-8">
        <PrismicRichText field={title} />
      </div>
      <div className="text-sm md:text-base mb-6 md:mb-8">
        <PrismicRichText field={events_description} />
      </div>
      <div className="text-lg md:text-xl mb-3 md:mb-4">
        <PrismicRichText field={tracks_title} />
      </div>
      <div className="text-sm md:text-base mb-10 md:mb-16">
        <PrismicRichText field={tracks_description} />
      </div>
    </section>
  );
};

export default EventsIntroduction;

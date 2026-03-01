import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type FiltersProps = SliceComponentProps<Content.FiltersSlice>;

const Filters: FC<FiltersProps> = ({ slice }) => {
  const { above_title_past_events, title_past_events, items } = slice.primary;

  const currentEvents = items.filter((item) => {
    const tag = item.tag_past_present?.[0];
    return tag && "text" in tag && tag.text === "present";
  });
  const pastEvents = items.filter((item) => {
    const tag = item.tag_past_present?.[0];
    return tag && "text" in tag && tag.text === "past";
  });

  console.log("Current Events:", currentEvents);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="aspect-video overflow-hidden rounded-lg">
              <PrismicNextImage
                field={item.item_photo}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xl mb-2 text-white pt-4">
              <PrismicRichText field={item.item_title} />
            </div>

            <div className="text-gray-600 mb-2">
              <PrismicRichText field={item.item_description} />
            </div>

            <div className="text-white opacity-80">
              <PrismicRichText field={item.item_info} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-6 md:mb-8 text-white pt-12 md:pt-20">
        <PrismicRichText field={above_title_past_events} />
        <PrismicRichText field={title_past_events} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastEvents.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="aspect-video overflow-hidden rounded-lg">
              <PrismicNextImage
                field={item.item_photo}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xl mb-2 text-white pt-4">
              <PrismicRichText field={item.item_title} />
            </div>

            <div className="text-gray-600 mb-2">
              <PrismicRichText field={item.item_description} />
            </div>

            <div className="text-white opacity-80">
              <PrismicRichText field={item.item_info} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filters;

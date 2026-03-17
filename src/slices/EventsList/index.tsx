import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type FiltersProps = SliceComponentProps<Content.FiltersSlice>;

const Filters: FC<FiltersProps> = ({ slice }) => {
  const {
    above_title_past_events,
    title_past_events,
    buttons_for_filters,
    items,
  } = slice.primary;

  const trackButtons = (buttons_for_filters ?? [])
    .map((button) => asText(button.filter_name).trim())
    .filter(Boolean);

  const currentEvents = items.filter((item) => {
    return asText(item.tag_past_present).trim().toLowerCase() === "present";
  });
  const pastEvents = items.filter((item) => {
    return asText(item.tag_past_present).trim().toLowerCase() === "past";
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-2 pb-12 md:pt-4 md:pb-12"
    >
      {trackButtons.length > 0 ? (
        <div className="mb-8 md:mb-10">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 md:gap-4">
            {trackButtons.map((label, index) => (
              <div
                key={`${label}-${index}`}
                className="min-w-[116px] rounded-xl border border-white/5 bg-white/[0.06] px-5 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm md:min-w-[132px] md:px-6 md:py-4"
              >
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-base font-medium text-transparent md:text-lg">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

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

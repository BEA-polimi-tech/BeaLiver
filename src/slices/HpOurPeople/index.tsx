"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Image from "next/image";

export type HpPeopleProps = SliceComponentProps<Content.HpPeopleSlice>;

const HpPeople: FC<HpPeopleProps> = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = slice.primary.person;
  const itemsPerPage = 2;
  const isPeoplePage = slice.variation === "peoplepage";

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 2 + items.length) % items.length);
  };

  const currentItems = isPeoplePage
    ? items
    : [items[currentIndex], items[(currentIndex + 1) % items.length]];

  return (
    <section className="py-12 md:py-16 lg:py-20 w-full">
      {/* Stile locale per garantire l'animazione senza config tailwind extra */}
      <style jsx global>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-slide {
          animation: fadeSlide 0.6s ease-out forwards;
        }
      `}</style>

      <div className="">
        <div className="text-center mb-10 md:mb-16 lg:mb-20 space-y-2">
          <div className="text-gray-400 text-sm">
            <PrismicRichText field={slice.primary.above_title} />
          </div>
          <div className="text-white text-xl md:text-2xl uppercase font-extralight">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </div>

        {/* Aggiunto key={currentIndex} e la classe animate-fade-slide */}
        <div
          key={isPeoplePage ? "all" : currentIndex}
          className={`grid ${isPeoplePage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 lg:grid-cols-2"} gap-8 md:gap-12 mb-8 md:mb-16 ${!isPeoplePage && "animate-fade-slide"}`}
        >
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center sm:items-start"
            >
              <div className="w-28 md:w-36 shrink-0 aspect-square relative overflow-hidden">
                <PrismicNextImage
                  field={item.person_image}
                  className="object-cover w-full h-full filter brightness-75"
                />
              </div>

              <div className="flex flex-col text-center sm:text-left">
                <div className="text-white text-lg font-extralight mb-1">
                  <PrismicRichText field={item.name} />
                </div>
                <div className="text-gray-500 text-xs mb-6">
                  <PrismicRichText field={item.title} />
                </div>
                <div className="text-gray-400 text-xs font-light">
                  <PrismicRichText field={item.description} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex justify-center gap-4 mt-12 ${isPeoplePage ? "hidden" : ""}`}
        >
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black text-white transition-all duration-300"
            aria-label="Previous people"
          >
            <Image
              src="/Images/rightArrow.svg"
              alt="Previous"
              width={16}
              height={16}
              className="rotate-180 invert-0 hover:invert"
            />
          </button>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black text-white transition-all duration-300"
            aria-label="Next people"
          >
            <Image
              src="/Images/rightArrow.svg"
              alt="Next"
              width={16}
              height={16}
              className="invert-0 hover:invert"
            />
          </button>
        </div>

        {/* Bottone Contact Us - Visibile solo nella variante peoplepage */}
        {isPeoplePage && (
          <div className="text-center mt-16">
            <Link
              href="/contacts"
              className="inline-block border border-white/50 rounded-md px-10 py-3 text-white text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              CONTACT US
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HpPeople;

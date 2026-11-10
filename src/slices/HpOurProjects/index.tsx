"use client"; // Necessario per usare useState in Next.js (App Router)

import { FC, useState } from "react";
import { asText, Content } from "@prismicio/client";
import projects from "@/app/projects/projects.json";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

export type HpOurProjectsProps = SliceComponentProps<Content.HpOurProjectsSlice>;

const HpOurProjects: FC<HpOurProjectsProps> = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = slice.primary.cards ?? [];
  // Preserve existing CMS images and content while filling out the project list.
  const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const paragraph = (value: string) => [{ type: "paragraph" as const, text: value || "-", spans: [] }];
  const descriptions: Record<string, string> = {
    "leg-aid-exoskeleton": "Students combine mechanics, electronics and control to build a hip-assist exoskeleton based on the open-source OpenExo platform.",
    "bea-band": "A student team is developing a wearable that brings together physiological and motion sensors, with a focus on compact design and local data processing.",
    "3d-printing-course": "A hands-on introduction to 3D printing, from selecting materials and preparing digital models to slicing, printing and evaluating the finished component.",
    "fes-bike": "-",
    "meeva": "-",
    "python-course": "An introductory Python course for students. Further details about the current edition are to be confirmed.",
    "bci-course": "A proposed practical introduction to brain–computer interfaces, exploring motor imagery and the acquisition and processing of brain-signal data.",
    "microfluidica-tdm": "A research project exploring a microfluidic chip concept for monitoring two antibiotics, combining chip design, simulations and investigation of detection methods.",
    "invox": "A BEA and PMDS project exploring a wearable interface that uses signals associated with the intention to speak to support communication.",
    "bea-polimi-innovators": "A collaboration helping students explore and develop biomedical and MedTech ideas through practical formats, peer exchange and connections with the innovation ecosystem.",
  };
  const carouselCards = projects.map((project) => {
    const existing = cards.find((card) => normalise(asText(card.title)) === normalise(project.name));
    if (existing) return { ...existing, description: paragraph(descriptions[project.slug] || "-") } as (typeof cards)[number];
    return {
      image: {},
      category: paragraph(project.type),
      title: paragraph(project.name),
      description: paragraph(descriptions[project.slug] || "-"),
      competenze: paragraph("-"),
      tecnologyimg: {},
    } as unknown as (typeof cards)[number];
  });
  const hasCards = carouselCards.length > 0;
  const currentCard = hasCards ? carouselCards[currentIndex] : null;

  const nextCard = () => {
    if (!hasCards) return;
    setCurrentIndex((prev) => (prev + 1) % carouselCards.length);
  };

  const prevCard = () => {
    if (!hasCards) return;
    setCurrentIndex((prev) => (prev - 1 + carouselCards.length) % carouselCards.length);
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 w-full">
      {/* Definizione Animazione CSS */}
      <style jsx global>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up-fade {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Variant: projectPage => grid 2 per row, foto sopra, testo sotto */}
      {slice.variation === "projectPage" && (
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {cards.map((card, idx) => (
              <article key={idx} className="flex flex-col">
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-800">
                  {card.image?.url ? <PrismicNextImage field={card.image}
                    className="object-cover w-full h-full"
                    imgixParams={{ fit: "crop" }} /> : <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300" aria-label="Image unavailable">-</div>}
                </div>

                <div className="mt-4">
                  <div className="text-gray-400 text-xs mb-1">
                    {asText(card.category).trim() ? <PrismicRichText field={card.category} /> : "-"}
                  </div>
                  <div className="text-white text-lg font-light mb-2">
                    <PrismicRichText field={card.title} />
                  </div>
                  <div className="text-gray-300 text-sm">
                    {asText(card.description).trim() ? <PrismicRichText field={card.description} /> : "-"}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Variant: default => Carosello */}
      {slice.variation !== "projectPage" && hasCards && currentCard && (
        <div className="mx-auto">
          {/* Header Sezione */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2">
            {slice.primary.abovetitle && (
              <div className="text-gray-400 text-sm">
                <PrismicRichText field={slice.primary.abovetitle} />
              </div>
            )}
            {slice.primary.title && (
              <div className="text-white text-xl md:text-2xl font-light neutralFace">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
          </div>

          {/* Carosello Card */}
          <div className="relative bg-transparent mb-8 md:mb-12 lg:mb-16">
            <div key={currentIndex} className="animate-slide-up-fade">
              {/* MOBILE: 1 card compatta (visibile solo sotto md) */}
              <div className="block md:hidden">
                <div className="flex flex-col gap-4">
                  <div className="w-full relative aspect-4/3 rounded-lg overflow-hidden shadow-2xl">
                    {currentCard.image?.url ? <PrismicNextImage field={currentCard.image}
                      className="object-cover w-full h-full"
                      imgixParams={{ fit: "crop" }}
                      priority /> : <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300" aria-label="Image unavailable">-</div>}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">
                        {asText(currentCard.category).trim() ? <PrismicRichText field={currentCard.category} /> : "-"}
                      </div>
                      <div className="text-white text-lg font-light">
                        <PrismicRichText field={currentCard.title} />
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm font-light">
                      {asText(currentCard.description).trim() ? <PrismicRichText field={currentCard.description} /> : "-"}
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLET: 2 card compatte affiancate (visibile solo md → lg) */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
                {[0, 1].map((offset) => {
                  const card = carouselCards[(currentIndex + offset) % carouselCards.length];
                  return (
                    <article key={offset} className="flex flex-col">
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-xl">
                        {card.image?.url ? <PrismicNextImage field={card.image}
                          className="object-cover w-full h-full"
                          imgixParams={{ fit: "crop" }}
                          priority={offset === 0} /> : <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300" aria-label="Image unavailable">-</div>}
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-gray-400 text-xs">
                          {asText(card.category).trim() ? <PrismicRichText field={card.category} /> : "-"}
                        </div>
                        <div className="text-white text-lg font-light">
                          <PrismicRichText field={card.title} />
                        </div>
                        <div className="text-gray-300 text-sm font-light">
                          {asText(card.description).trim() ? <PrismicRichText field={card.description} /> : "-"}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* DESKTOP: layout dettagliato immagine + testo affiancati (da lg in su) */}
              <div className="hidden lg:block">
                <div className="flex flex-row gap-16 items-start">
                  {/* Sinistra: Immagine */}
                  <div className="w-1/2 relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                    {currentCard.image?.url ? <PrismicNextImage field={currentCard.image}
                      className="object-cover w-full h-full"
                      imgixParams={{ fit: "crop" }}
                      priority /> : <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300" aria-label="Image unavailable">-</div>}
                  </div>

                  {/* Destra: Contenuto Testuale */}
                  <div className="w-1/2 flex flex-col justify-center text-left space-y-8 py-4">
                    <div>
                      <div className="text-gray-400 text-xs mb-2">
                        {asText(currentCard.category).trim() ? <PrismicRichText field={currentCard.category} /> : "-"}
                      </div>
                      <div className="text-white text-xl font-light">
                        <PrismicRichText field={currentCard.title} />
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm font-light">
                      {asText(currentCard.description).trim() ? <PrismicRichText field={currentCard.description} /> : "-"}
                    </div>

                    <div>
                      <div className="text-gray-400 text-xs mb-2">
                        Competences:
                      </div>
                      <div className="text-gray-300 text-sm font-light">
                        {/* @ts-expect-error competenze exists only in default variant */}
                        <PrismicRichText field={currentCard.competenze?.length ? currentCard.competenze : paragraph("-")} />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-2">
                        Technology:
                      </div>
                      <div>
                        {/* @ts-expect-error tecnologyimg exists only in default variant */}
                        {currentCard.tecnologyimg?.url ? <PrismicNextImage field={currentCard.tecnologyimg} /> : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigazione Carosello */}
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={prevCard}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black text-white transition-all duration-300"
                aria-label="Previous project"
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
                onClick={nextCard}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black text-white transition-all duration-300"
                aria-label="Next project"
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

            {/* Bottone "See more projects" */}
            {slice.primary.button_projects && (
              <div className="pt-4 w-full flex justify-center mt-8">
                <PrismicNextLink
                  field={slice.primary.button_projects}
                  className="inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300 group"
                >
                  <span>See more projects</span>
                  <Image
                    src="/Images/rightArrow.svg"
                    alt="Arrow right"
                    width={20}
                    height={20}
                    className="group-hover:invert transition-all"
                  />
                </PrismicNextLink>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HpOurProjects;

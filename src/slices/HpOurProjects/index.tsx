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
    "3d-printing-course": "From digital designs to physical prototypes, our beginner and advanced courses introduce students to the possibilities of 3D printing through practical learning and collaborative projects. Participants explore the workflow from 3D modelling to fabrication, building a foundation in FDM printing before progressing to more complex designs, materials and applications.",
    "fes-bike": "-",
    "meeva": "-",
    "python-course": "An introductory Python course for students. Further details about the current edition are to be confirmed.",
    "bci-course": "A proposed practical introduction to brain–computer interfaces, exploring motor imagery and the acquisition and processing of brain-signal data.",
    "invox": "A BEA and PMDS project exploring a wearable interface that uses signals associated with the intention to speak to support communication.",
    "bea-polimi-innovators": "Students bridge biomedical engineering, clinical needs, and entrepreneurship through MedTech meetups, hospital collaborations, and innovation challenges, supported by the Polimi Innovators ecosystem.",
  };
  // Temporary Unsplash photos illustrate subjects, not BEA prototypes.
  const temporaryImages: Record<string, string> = {
    "3d-printing-course": "https://images.unsplash.com/photo-1705475025559-ad8efdedc74f?auto=format&fit=crop&w=1200&q=80",
    "fes-bike": "https://images.unsplash.com/photo-1521824233774-822f829b2fcf?auto=format&fit=crop&w=1200&q=80",
    "meeva": "https://images.unsplash.com/photo-1447433865958-f402f562b843?auto=format&fit=crop&w=1200&q=80",
    "python-course": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
    "bci-course": "https://images.unsplash.com/photo-1765256931845-56da0f7db9cb?auto=format&fit=crop&w=1200&q=80",
    "invox": "https://images.unsplash.com/photo-1765256931845-56da0f7db9cb?auto=format&fit=crop&w=1200&q=80",
    "bea-polimi-innovators": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
    "leg-aid-exoskeleton": "https://images.unsplash.com/photo-1765256931845-56da0f7db9cb?auto=format&fit=crop&w=1200&q=80",
    "bea-band": "https://images.unsplash.com/photo-1765256931845-56da0f7db9cb?auto=format&fit=crop&w=1200&q=80",
  };
  const illustrativeImage = (slug: string, name: string) => (
    <div className="relative w-full h-full">
      {/* Temporary third-party illustration. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={temporaryImages[slug]} alt={`Illustrative image for ${name}`} className="w-full h-full object-cover" />
      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">Illustrative image · Unsplash</span>
    </div>
  );
  const carouselCards = projects.map((project) => {
    const existing = cards.find((card) => normalise(asText(card.title)) === normalise(project.name) || (project.slug === "3d-printing-course" && normalise(asText(card.title)) === "3dprintingcourse20"));
    if (existing) return { ...existing, category: project.slug === "bea-polimi-innovators" ? paragraph("All Levels") : project.slug === "3d-printing-course" ? paragraph("Beginner & Advanced Levels") : existing.category, title: project.slug === "3d-printing-course" ? paragraph("3D Printing Courses") : existing.title, description: paragraph(descriptions[project.slug] || "-") } as (typeof cards)[number];
    return {
      image: {},
      category: paragraph(project.slug === "bea-polimi-innovators" ? "All Levels" : project.slug === "3d-printing-course" ? "Beginner & Advanced Levels" : project.type),
      title: paragraph(project.name),
      description: paragraph(descriptions[project.slug] || "-"),
      competenze: paragraph("-"),
      tecnologyimg: {},
    } as unknown as (typeof cards)[number];
  });
  const courseDetails = (
    <>
      <div><div className="text-gray-400 text-xs mb-2">Competences:</div>
        <div className="text-gray-300 text-sm font-light"><p>Required: No previous 3D printing experience for the beginner course; basic CAD and 3D printing knowledge for the advanced course.</p><p>Acquired: Design for additive manufacturing, material selection, slicing and print preparation, printer operation, troubleshooting, prototyping and teamwork.</p></div>
      </div>
      <div><div className="text-gray-400 text-xs mb-5">Technology:</div>
        <div className="grid grid-cols-[repeat(3,96px)] gap-y-5 text-white text-xs">
          <div className="flex flex-col items-center gap-1 text-center"><svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="FDM 3D printing"><path d="M4 21V3h16v18M3 21h18M7 18h10M8 4v4h8V4M9 8v3l3 2 3-2V8M12 13v2M9 16h6" /></svg><span>FDM printing</span></div>
          <div className="flex flex-col items-center gap-1 text-center">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://cdn.simpleicons.org/autodesk/ffffff" className="h-10 w-10 object-contain" alt="Autodesk Fusion 360" /><span>Fusion 360</span></div>
          <div className="flex flex-col items-center gap-1 text-center"><svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="PrusaSlicer"><path d="M4 7 12 3l8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4" /></svg><span>PrusaSlicer</span></div>
          <div className="flex flex-col items-center gap-1 text-center"><svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="3D scanning"><path d="M4 8V4h4m8 0h4v4M4 16v4h4m8 0h4v-4M8 9l4-2 4 2v6l-4 2-4-2V9Zm0 0 4 2 4-2m-4 2v6" /></svg><span>3D scanning</span></div>
          <div className="flex flex-col items-center gap-1 text-center"><svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="Revo Scan 6"><path d="M4 8V4h4m8 0h4v4M4 16v4h4m8 0h4v-4M8 10l4-2 4 2v4l-4 2-4-2v-4Zm0 0 4 2 4-2m-4 2v4" /></svg><span>Revo Scan 6</span></div>
        </div>
      </div>
    </>
  );
  const pieDetails = (
    <>
      <div>
        <div className="text-gray-400 text-xs mb-2">Competences:</div>
        <div className="text-gray-300 text-sm font-light">
          <p>Required: None (open to all backgrounds; interest in MedTech, healthcare innovation, and startups).</p>
          <p>Acquired: Clinical needs analysis, MedTech venture building, pitching, partnership &amp; event management.</p>
        </div>
      </div>
      <div>
        <div className="text-gray-400 text-xs mb-5">Technology:</div>
        <div className="grid grid-cols-[repeat(3,96px)] items-center text-white text-xs [&>*]:justify-self-center">
          <span className="relative flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4a3 3 0 0 0-5.7-1.3A3.5 3.5 0 0 0 4 8.8a3.5 3.5 0 0 0 .7 6.4A3.5 3.5 0 0 0 9 20a3 3 0 0 0 3-3V4Zm0 0a3 3 0 0 1 5.7-1.3A3.5 3.5 0 0 1 20 8.8a3.5 3.5 0 0 1-.7 6.4A3.5 3.5 0 0 1 15 20a3 3 0 0 1-3-3M8 8.5c1.2 0 2 .7 2 2M16 8.5c-1.2 0-2 .7-2 2M7 15c1.1 0 2-.6 2-1.7M17 15c-1.1 0-2-.6-2-1.7"/></svg><span className="absolute top-full mt-1 whitespace-nowrap">LLMs</span>
          </span>
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/python/ffffff" width="40" height="40" alt="Python" />
          </span>
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/notion/ffffff" width="40" height="40" alt="Notion" />
          </span>
        </div>
      </div>
    </>
  );
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
            {cards.filter((card) => normalise(asText(card.title)) !== "microfluidicatdm").map((card, idx) => (
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
                      priority /> : illustrativeImage(projects[currentIndex].slug, projects[currentIndex].name)}
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
                    {projects[currentIndex].slug === "3d-printing-course" && courseDetails}
                    {projects[currentIndex].slug === "bea-polimi-innovators" && pieDetails}
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
                          priority={offset === 0} /> : illustrativeImage(projects[(currentIndex + offset) % projects.length].slug, projects[(currentIndex + offset) % projects.length].name)}
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
                        {projects[(currentIndex + offset) % projects.length].slug === "3d-printing-course" && courseDetails}
                        {projects[(currentIndex + offset) % projects.length].slug === "bea-polimi-innovators" && pieDetails}
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
                      priority /> : illustrativeImage(projects[currentIndex].slug, projects[currentIndex].name)}
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

                    {projects[currentIndex].slug === "3d-printing-course" ? courseDetails : projects[currentIndex].slug === "bea-polimi-innovators" ? pieDetails : (
                      <>
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
                      </>
                    )}
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

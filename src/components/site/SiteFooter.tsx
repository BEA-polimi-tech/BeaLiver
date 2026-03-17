import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

import ArrowIcon from "./ArrowIcon";

type SiteFooterProps = {
  settings: Content.HeaderDocument;
  footer: Content.FooterDocument | null;
};

const SiteFooter: FC<SiteFooterProps> = ({ settings, footer }) => {
  const navigationLinks = settings.data.links ?? [];
  const ctaButton = settings.data.button;
  const ctaLabel = ctaButton?.text?.trim() || "Join us";

  return (
    <footer className="relative pb-8 pt-12 sm:pt-16">
      <div className="soft-divider mb-8 sm:mb-10" />

      <div className="surface-panel-strong relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[-8rem] w-80 rounded-full bg-[radial-gradient(circle,rgba(255,92,116,0.16),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8rem] top-0 h-full w-72 rounded-full bg-[radial-gradient(circle,rgba(85,162,255,0.16),transparent_68%)] blur-3xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="image-frame flex h-16 w-16 items-center justify-center rounded-2xl p-2">
                <PrismicNextImage
                  field={settings.data.logo}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="section-kicker before:hidden">Biomedical Engineering</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Association - PoliMI
                </p>
              </div>
            </Link>

            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              A student community building biomedical projects, running events,
              and creating real opportunities to learn by doing.
            </p>

            <div className="flex flex-wrap gap-3">
              {navigationLinks.map((item, index) => {
                const label = asText(item.text).trim() || item.link.text || "Link";

                return (
                  <PrismicNextLink
                    key={`${label}-${index}`}
                    field={item.link}
                    className="tag-chip hover:border-white/20 hover:text-white"
                  >
                    {label}
                  </PrismicNextLink>
                );
              })}
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]"
            />
            <div className="relative flex h-full flex-col gap-5">
              <span className="section-kicker before:hidden">Get Involved</span>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-white">
                  Turn ideas into events, projects, and community impact.
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  Join the next chapter of BEA and help shape biomedical
                  engineering culture across students, labs, and industry.
                </p>
              </div>

              {ctaButton ? (
                <PrismicNextLink field={ctaButton} className="cta-primary self-start">
                  <span>{ctaLabel}</span>
                  <ArrowIcon className="h-4 w-4" />
                </PrismicNextLink>
              ) : null}
            </div>
          </div>
        </div>

        <div className="soft-divider my-6" />

        <div className="relative flex flex-col gap-4 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <div className="rich-copy text-sm text-[var(--text-muted)] [&_p]:mb-0">
            {footer?.data.copyright ? (
              <PrismicRichText field={footer.data.copyright} />
            ) : (
              <p>Biomedical Engineering Association - PoliMI</p>
            )}
          </div>
          <div className="data-pill self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
            Events, projects, people
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

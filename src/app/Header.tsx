/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useEffect, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { asLink, Content } from "@prismicio/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  settings: Content.HeaderDocument;
}

const Header: FC<HeaderProps> = ({ settings }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const isActive = (field: Parameters<typeof asLink>[0]) => {
    const href = asLink(field);
    if (!href) return false;
    let path: string;
    try {
      const url = new URL(href, "https://www.beapolimi.it");
      if (url.hostname !== "www.beapolimi.it" && url.hostname !== "beapolimi.it" && !href.startsWith("/")) return false;
      path = url.pathname.replace(/\/+$/, "") || "/";
    } catch { return false; }
    const current = (pathname || "/").replace(/\/+$/, "") || "/";
    return path === "/" ? current === "/" : current === path || current.startsWith(`${path}/`);
  };
  const navigationLinks = settings.data.links || [];
  const ctaButton = settings.data.button;
  const logo = settings.data.logo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 w-full py-4 lg:py-6 bg-transparent backdrop-blur-md border-b transition-colors ${scrolled ? "border-white/40" : "border-transparent"}`}>
      <nav className="mx-auto flex w-full items-center justify-between px-5 md:max-w-3xl md:px-6 lg:max-w-5xl lg:px-10 xl:max-w-[1200px] xl:px-12">
        {/* LOGO */}
        <div className="shrink-0 w-12 lg:w-16">
          <Link href="/">
            <PrismicNextImage
              field={logo}
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>

        {/* NAVIGAZIONE DESKTOP (Centro) */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navigationLinks.map((item, index) => (
            <div key={index}>
              <PrismicNextLink
                field={item.link}
                aria-current={isActive(item.link) ? "page" : undefined}
                className={`text-sm font-extralight neutralFace transition-opacity hover:opacity-100 ${isActive(item.link) ? "text-white opacity-100" : "text-white opacity-50"}`}
              />
            </div>
          ))}
        </div>

        {/* BOTTONE JOIN US DESKTOP (Destra) */}
        <div className="hidden lg:block shrink-0">
          {ctaButton && (
            <PrismicNextLink
              field={ctaButton}
              aria-current={isActive(ctaButton) ? "page" : undefined}
              className={`inline-block px-4 py-3 border border-white rounded-lg text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:opacity-100 transition-all duration-300 ${isActive(ctaButton) ? "opacity-100" : "opacity-50"}`}
            />
          )}
        </div>

        {/* HAMBURGER BUTTON (Mobile/Tablet) */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`mx-auto w-full px-5 md:max-w-3xl md:px-6 lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[400px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
          {navigationLinks.map((item, index) => (
            <div key={index} onClick={() => setMobileMenuOpen(false)}>
              <PrismicNextLink
                field={item.link}
                aria-current={isActive(item.link) ? "page" : undefined}
                className={`text-base font-extralight neutralFace transition-opacity hover:opacity-100 ${isActive(item.link) ? "text-white opacity-100" : "text-white opacity-50"}`}
              />
            </div>
          ))}

          {ctaButton && (
            <div onClick={() => setMobileMenuOpen(false)}>
              <PrismicNextLink
                field={ctaButton}
                aria-current={isActive(ctaButton) ? "page" : undefined}
                className={`inline-block px-6 py-3 border border-white rounded-lg text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:opacity-100 transition-all duration-300 mt-2 ${isActive(ctaButton) ? "opacity-100" : "opacity-50"}`}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

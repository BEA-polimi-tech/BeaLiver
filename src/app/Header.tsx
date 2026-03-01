/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";
import Link from "next/link";

interface HeaderProps {
  settings: Content.HeaderDocument;
}

const Header: FC<HeaderProps> = ({ settings }) => {
  const navigationLinks = settings.data.links || [];
  const ctaButton = settings.data.button;
  const logo = settings.data.logo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 lg:py-6 bg-transparent relative">
      <nav className="mx-auto flex items-center justify-between">
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
                className="text-gray-400 text-sm hover:text-gray-300 font-extralight neutralFace"
              />
            </div>
          ))}
        </div>

        {/* BOTTONE JOIN US DESKTOP (Destra) */}
        <div className="hidden lg:block shrink-0">
          {ctaButton && (
            <PrismicNextLink
              field={ctaButton}
              className="inline-block px-4 py-3 border border-white rounded-lg text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300"
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
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
                className="text-gray-300 text-base hover:text-white font-extralight neutralFace"
              />
            </div>
          ))}

          {ctaButton && (
            <div onClick={() => setMobileMenuOpen(false)}>
              <PrismicNextLink
                field={ctaButton}
                className="inline-block px-6 py-3 border border-white rounded-lg text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

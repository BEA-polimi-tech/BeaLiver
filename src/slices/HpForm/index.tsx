"use client";

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import { sendEmail } from "@/app/actions";

export type HpFormProps = SliceComponentProps<Content.HpFormSlice>;

const HpForm: FC<HpFormProps> = ({ slice }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (formData: FormData) => {
    setStatus("submitting");
    const result = await sendEmail(formData);

    if (result?.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/10 px-3 py-3 text-white placeholder-white focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all text-sm font-light";

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 w-full relative overflow-hidden">
      <div className="mx-auto">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <div className="text-gray-400 text-sm mb-3 md:mb-4">
            <PrismicRichText field={slice.primary.abovetitle} />
          </div>
          <div className="text-white text-xl md:text-2xl font-light tracking-wide">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* COLONNA SINISTRA: FORM (Con bordo bianco esterno) */}
          <div className="w-full border-[1px] border-white p-8 md:p-10">
            <div className="text-white text-xl font-light mb-6 uppercase tracking-wide">
              <PrismicRichText field={slice.primary.form_title} />
            </div>

            {status === "success" ? (
              <div className="py-10 text-left animate-in fade-in duration-500 bg-white/5 rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl text-white mb-2">Message Sent</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for contacting us.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-white underline hover:text-gray-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} action={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Message"
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>

                <div className="pt-2 pb-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full md:w-auto px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center justify-center gap-3"
                  >
                    <span>
                      {status === "submitting" ? "Sending..." : "Submit"}
                    </span>
                    <Image
                      src="/Images/rightArrow.svg"
                      alt="Arrow"
                      width={14}
                      height={14}
                      className="invert"
                    />
                  </button>

                  {status === "error" && (
                    <p className="text-red-500 text-sm mt-4">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* COLONNA DESTRA: INFO & SOCIAL */}
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 pt-8 lg:pt-10 ml-0 lg:ml-16 xl:ml-24">
            <div className="text-white font-light text-base md:text-lg">
              <PrismicRichText field={slice.primary.about_title} />
            </div>

            <div className="space-y-8">
              {slice.primary.informations.map((info, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="shrink-0 w-6 h-6 mt-0">
                    <PrismicNextImage
                      field={info.info_icon}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div className="text-white text-base font-light leading-relaxed max-w-xs">
                    <PrismicRichText field={info.info_text} />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex gap-6">
                {slice.primary.social_images.map((social, index) => (
                  <div key={index}>
                    <PrismicNextLink
                      field={social.social_link}
                      className="block w-8 h-8 hover:opacity-70 transition-opacity"
                    >
                      <PrismicNextImage
                        field={social.image}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HpForm;

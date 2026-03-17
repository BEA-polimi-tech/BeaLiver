import { FC, ReactNode } from "react";
import { RichTextField, TitleField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type SectionHeaderProps = {
  eyebrow?: RichTextField | TitleField | null;
  title?: RichTextField | TitleField | null;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  kickerClassName?: string;
  children?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  align = "center",
  className = "",
  titleClassName = "",
  kickerClassName = "",
  children,
}) => {
  const alignClass =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <div
          className={`section-kicker ${align === "center" ? "justify-center" : ""} ${kickerClassName}`.trim()}
        >
          <PrismicRichText field={eyebrow} />
        </div>
      ) : null}

      {title ? (
        <div
          className={`section-title ${align === "center" ? "mx-auto" : ""} ${titleClassName}`.trim()}
        >
          <PrismicRichText field={title} />
        </div>
      ) : null}

      {children}
    </div>
  );
};

export default SectionHeader;

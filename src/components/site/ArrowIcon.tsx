import { FC } from "react";

type ArrowIconProps = {
  className?: string;
};

const ArrowIcon: FC<ArrowIconProps> = ({ className = "" }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16663M15.8334 10L10.0001 15.8333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
};

export default ArrowIcon;

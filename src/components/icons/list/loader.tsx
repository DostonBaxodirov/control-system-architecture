import { FC } from "react";

export interface LoaderProps {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className}>
    <path
      d="M8 2C11.5 2 14 5 14 8"
      stroke="currentColor"
      strokeOpacity="0.08"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2C4.5 2 2 5 2 8C2 11 4.5 14 8 14C11.5 14 14 11 14 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Loader;

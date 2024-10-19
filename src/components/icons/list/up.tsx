import { FC } from "react";

export interface UpProps {
  className?: string;
}

const Up: FC<UpProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className}>
    <path
      d="M8 14V2M8 2L3 7M8 2L13 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Up;

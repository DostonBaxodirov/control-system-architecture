import { FC } from "react";

export interface TooltipProps {
  className?: string;
}

const Tooltip: FC<TooltipProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={className}>
    <path
      d="M7 10.4238L7 6.70703"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.8957 4.09141C7.8957 4.58846 7.49276 4.99141 6.9957 4.99141C6.49865 4.99141 6.0957 4.58846 6.0957 4.09141C6.0957 3.59435 6.49865 3.19141 6.9957 3.19141C7.49276 3.19141 7.8957 3.59435 7.8957 4.09141Z"
      fill="currentColor"
    />
    <path
      d="M1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Tooltip;

import { FC } from "react";

export interface SuccessfulProps {
  className?: string;
}

const Successful: FC<SuccessfulProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M14 4L6 12L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Successful;

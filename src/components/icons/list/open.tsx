import { FC } from "react";

export interface OpenProps {
  className?: string;
}

const Open: FC<OpenProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Open;

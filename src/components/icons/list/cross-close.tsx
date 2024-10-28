import { FC } from "react";

export interface CrossCloseProps {
  className?: string;
}

const CrossClose: FC<CrossCloseProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5649 2.56588C14.8773 2.25346 14.8773 1.74693 14.5649 1.43451C14.2525 1.12209 13.746 1.12209 13.4335 1.43451L7.99922 6.86882L2.5649 1.43451C2.25248 1.12209 1.74595 1.12209 1.43353 1.43451C1.12111 1.74693 1.12111 2.25346 1.43353 2.56588L6.86785 8.0002L1.43353 13.4345C1.12111 13.7469 1.12111 14.2535 1.43353 14.5659C1.74595 14.8783 2.25248 14.8783 2.5649 14.5659L7.99922 9.13157L13.4335 14.5659C13.746 14.8783 14.2525 14.8783 14.5649 14.5659C14.8773 14.2535 14.8773 13.7469 14.5649 13.4345L9.13059 8.0002L14.5649 2.56588Z"
      fill="currentColor"
    />
  </svg>
);

export default CrossClose;

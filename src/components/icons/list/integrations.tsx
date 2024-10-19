import { FC } from "react";

export interface IntegrationsProps {
  className?: string;
}

const Integrations: FC<IntegrationsProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M4 8L10 2L9 6L12 8L6 14L7 10L4 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default Integrations;

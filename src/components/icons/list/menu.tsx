import { FC } from "react";

export interface MenuProps {
  className?: string;
}

const Menu: FC<MenuProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.25 9H15.75M2.25 4.5H15.75M2.25 13.5H15.75"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Menu;

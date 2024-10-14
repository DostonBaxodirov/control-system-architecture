import { FC } from "react";

export interface MenuSlimProps {
  className?: string;
}

const MenuSlim: FC<MenuSlimProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.375 9H2.25M15.75 4.5H2.25M12.375 13.5H2.25"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MenuSlim;

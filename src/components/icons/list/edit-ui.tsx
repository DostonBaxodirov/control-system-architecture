import { FC } from "react";

export interface EditUiProps {
  className?: string;
}

const EditUi: FC<EditUiProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.90039 8C4.90039 8.82843 4.22882 9.5 3.40039 9.5C2.57196 9.5 1.90039 8.82843 1.90039 8C1.90039 7.17157 2.57196 6.5 3.40039 6.5C4.22882 6.5 4.90039 7.17157 4.90039 8ZM9.49609 8C9.49609 8.82843 8.82452 9.5 7.99609 9.5C7.16767 9.5 6.49609 8.82843 6.49609 8C6.49609 7.17157 7.16767 6.5 7.99609 6.5C8.82452 6.5 9.49609 7.17157 9.49609 8ZM12.5996 9.5C13.428 9.5 14.0996 8.82843 14.0996 8C14.0996 7.17157 13.428 6.5 12.5996 6.5C11.7712 6.5 11.0996 7.17157 11.0996 8C11.0996 8.82843 11.7712 9.5 12.5996 9.5Z"
      fill="currentColor"
    />
  </svg>
);

export default EditUi;

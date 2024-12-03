import { FC } from "react";

interface PlayProps {
  className: string;
}

const Play: FC<PlayProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.46143 3.39334C4.46143 2.75517 4.46143 2.43608 4.59449 2.26019C4.71041 2.10696 4.88758 2.01213 5.07938 2.00068C5.29954 1.98754 5.56504 2.16453 6.09603 2.51853L13.006 7.12519C13.4448 7.41769 13.6641 7.56394 13.7406 7.74828C13.8074 7.90944 13.8074 8.09056 13.7406 8.25172C13.6641 8.43606 13.4448 8.58231 13.006 8.87481L6.09603 13.4815C5.56504 13.8355 5.29954 14.0125 5.07938 13.9993C4.88758 13.9879 4.71041 13.893 4.59449 13.7398C4.46143 13.5639 4.46143 13.2448 4.46143 12.6067L4.46143 3.39334Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Play;

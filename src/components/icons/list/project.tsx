import { FC } from 'react';

export interface ProjectProps {
  className?: string;
}

const Project: FC<ProjectProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 5V3H7v2H1v16h22V5zM8 4h8v1H8zm14 16H2V10h20zm0-11H2V6h20z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

export default Project;

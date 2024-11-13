import React from 'react';

import * as List from './list';

import cls from './icon.module.scss';

export interface IIconProps {
  name: keyof typeof List;
  className?: string;
  cy?: string;
  onClick?: () => void;
  classNameIcon?: string;
}

const Icon: React.FC<IIconProps> = ({ cy, name, className, onClick, classNameIcon }) => {
  const IconItem = List[name];

  if (!IconItem) {
    return null;
  }

  return (
    <span
      className={`${cls.wrapper} ${className}`}
      onClick={onClick}
      style={{
        width: classNameIcon ? 'max-content' : '20px',
        height: classNameIcon ? 'max-content' : '20px',
        display: 'block'
      }}
      data-cy={cy}
    >
      <IconItem className={classNameIcon || ''} />
    </span>
  );
};

export default Icon;

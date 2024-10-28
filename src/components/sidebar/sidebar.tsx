import React, { ReactNode } from 'react';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

import Button from '../button/button';
import Icon from '../icons/icon';

import CustomMenu, { CustomMenuItemsProps, CustomMenuProps } from './menu';

import cls from './sidebar.module.scss';

export interface SidebarProps extends Omit<CustomMenuProps, 'menuItems'> {
  items: CustomMenuItemsProps[];
  minimized?: boolean;
  cy?: { wrapper?: string; logo?: string };
  accountSelector?: ReactNode;
  open: boolean;
  onOpen: () => void;
  testMode: ReactNode;
  showIcon?: ReactNode;
  onLogo?: () => void;
  bodyClassName?: string;
  testModeClassName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onLogo,
  cy,
  items,
  minimized = false,
  accountSelector,
  open,
  onOpen,
  testMode,
  showIcon,
  bodyClassName,
  testModeClassName,
  activeKey,
  ...args
}) => (
  <div className={twMerge('transition-width h-full duration-300 ease-linear', cls.wrapper, minimized && cls.minimized, !open ? 'w-[240px]' : 'w-[82px]')} data-cy={cy?.wrapper}>
    <div className={twMerge(cx('relative flex items-center', 'px-2 pb-5 pt-7'))}>
      <div className={twMerge('transition-all duration-300', open ? 'opacity-0 delay-0' : 'opacity-100 delay-200')}>{showIcon && showIcon}</div>
      <Button
        intent="text"
        className={twMerge(cx('absolute right-2 h-max w-max translate-x-0 p-0 transition-all duration-300', open && 'right-1/2 translate-x-1/2'))}
        onClick={onOpen}
      >
        <Icon name={open ? 'menuSlim' : 'menu'} classNameIcon="w-[18px] h-[18px]" />
      </Button>
    </div>
    <div className="mb-5 h-[1px] w-full bg-[#e0e0e0]" />
    <div className="flex h-[calc(100vh_-_83px)] w-full flex-col justify-between pb-7">
      <div className="w-full">
        {accountSelector && <div className={twMerge(cx( 'px-2 transition-all duration-300', open && 'px-5'))}>{accountSelector}</div>}
        <div className={twMerge(cx(cls.items, 'px-2 transition-all duration-300', open && 'px-5', bodyClassName))}>
          {items.slice(0, 1).map((item, index) => (
            <CustomMenu activeKey={activeKey} open={open} key={item.title || index} menuItems={item} {...args} />
          ))}
        </div>
        <div className={twMerge(cx('px-2 transition-all duration-300', open && 'px-5'))}>
          <div className={twMerge('')}>
            {items?.slice(1, items.length + 1).map((item, index) => <CustomMenu activeKey={activeKey} open={open} key={item.title || index} menuItems={item} {...args} />)}
          </div>
        </div>
      </div>
      {testMode && <div className={twMerge(cx('mt-5', testModeClassName))}>{testMode}</div>}
    </div>
  </div>
);

export default Sidebar;

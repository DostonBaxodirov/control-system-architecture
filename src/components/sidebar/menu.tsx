import { FC } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import cx from 'classnames';

import cls from './sidebar.module.scss';

export type MenuItem = NonNullable<MenuProps['items']>[number] & { tooltip?: string };

export interface CustomMenuItemsProps {
  items: MenuItem[];
  title?: string;
  newPage?: boolean;
}

export interface CustomMenuProps extends Omit<MenuProps, 'items'> {
  menuItems: CustomMenuItemsProps;
  open: boolean;
  activeKey?: string;
}

const CustomMenu: FC<CustomMenuProps> = ({ menuItems, open, activeKey, ...args }) => (
  <div className={cx(cls['custom-menu'], open && cls['new-page-open'])}>
    {!menuItems.newPage && <p className="my-2 text-xs font-medium text-black-40">{menuItems?.title}</p>}
    {/* <Menu mode="inline" className="flex flex-col gap-[2px] !border-r-0" items={menuItems.items} {...args} /> */}
    <Menu mode="inline" className="flex flex-col gap-[2px] !border-r-0" {...args}>
      {menuItems.items?.map(({ key, icon, onClick, label, tooltip, ...args }: any) => (
        <div key={key} className={cx('rounded-xl transition-all duration-300', activeKey === key && 'bg-[#f7f7f7]')}>
          {open || tooltip ? (
            <Menu.Item icon={icon} onClick={onClick} {...args}>
              {label}
            </Menu.Item>
          ) : (
            <Menu.Item icon={icon} onClick={onClick} {...args}>
              {label}
            </Menu.Item>
          )}
        </div>
      ))}
    </Menu>
  </div>
);

export default CustomMenu;

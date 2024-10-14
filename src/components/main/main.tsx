'use client';

import { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

import Icon from '../icons/icon';
import Sidebar from '../sidebar/sidebar';

import cls from './main.module.scss';

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(!!localStorage.getItem('sidebarOpen'));

  return (
    <div className={cls.main}>
      <div className={cx(cls['main-sidebar'], open && cls['main-sidebar-open'])}>
        <Sidebar
          items={[
            {
              items: [
                {
                  key: '/team',
                  icon: <Icon name="team" classNameIcon=" w-[18px] h-[18px]" />,
                  label: 'Team & Access',
                  onClick: () => push('/team')
                },
                {
                  key: '/projects',
                  icon: <Icon name="project" classNameIcon="w-[18px] h-[18px]" />,
                  label: 'Deals',
                  onClick: () => push('/deals')
                },
                {
                  key: '/reports',
                  icon: <Icon name="project" classNameIcon=" w-[18px] h-[18px]" />,
                  label: 'Reports',
                  onClick: () => push('/reports')
                }
              ],
              newPage: true
            }
          ]}
          // selectedKey={`/${pathname.split('/')[1]}`}
          testMode={<></>}
          open={!!localStorage.getItem('sidebarOpen')}
          onOpen={() => {
            setOpen(!open);
            localStorage.setItem('sidebarOpen', open ? '' : 'true');
          }}
        />
      </div>
      <div className={cls['main-content']}>{children}</div>
    </div>
  );
};

export default Main;

'use client';

import { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

import AccountSelector from '../account-selector/account-selector';
import Icon from '../icons/icon';
import MobileSidebar from '../mobile-sidebar/mobile-sidebar';
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
                  label: 'Jamoa',
                  onClick: () => push('/team')
                },
                {
                  key: '/projects',
                  icon: <Icon name="project" classNameIcon=" w-[18px] h-[18px]" />,
                  label: 'Loyixalar',
                  onClick: () => push('/projects')
                },
                {
                  key: '/plan',
                  icon: <Icon name="plan" classNameIcon="w-[18px] h-[18px]" />,
                  label: 'Smeta reja',
                  onClick: () => push('/plan')
                },
                {
                  key: '/cost',
                  icon: <Icon name="cost" classNameIcon=" w-[18px] h-[18px]" />,
                  label: 'Xarajatlar',
                  onClick: () => push('/cost')
                }
              ],
              newPage: true
            }
          ]}
          // selectedKey={`/${pathname.split('/')[1]}`}
          testMode={<></>}
          accountSelector={<AccountSelector />}
          open={!!localStorage.getItem('sidebarOpen')}
          onOpen={() => {
            setOpen(!open);
            localStorage.setItem('sidebarOpen', open ? '' : 'true');
          }}
        />
      </div>
      <MobileSidebar />
      <div className={cls['main-content']}>{children}</div>
    </div>
  );
};

export default Main;

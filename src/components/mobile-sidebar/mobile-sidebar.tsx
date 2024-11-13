'use client';

import { FC } from 'react';
import cx from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

import AccountSelector from '../account-selector/account-selector';
import Icon from '../icons/icon';

const MobileSidebar: FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <div className=" absolute bottom-0 flex h-auto w-full items-center justify-between gap-2 border-t border-black-8 px-5 py-3 md:hidden ">
      <div
        className={cx('flex cursor-pointer flex-col items-center justify-center gap-1 p-2', pathname.split('/')[1].includes('team') && 'rounded-md bg-black-3')}
        onClick={() => push('/team')}
      >
        <Icon name="team" classNameIcon=" w-[18px] h-[18px]" />
        <p className=" text-sm font-medium">Jamoa</p>
      </div>
      <div
        className={cx('flex cursor-pointer flex-col items-center justify-center gap-1 p-2', pathname.split('/')[1].includes('projects') && 'rounded-md bg-black-3')}
        onClick={() => push('/projects')}
      >
        <Icon name="project" classNameIcon=" w-[18px] h-[18px]" />
        <p className=" text-sm font-medium">Loyixalar</p>
      </div>
      <div
        className={cx('flex cursor-pointer flex-col items-center justify-center gap-1 p-2', pathname.split('/')[1].includes('plan') && 'rounded-md bg-black-3')}
        onClick={() => push('/plan')}
      >
        <Icon name="plan" classNameIcon=" w-[18px] h-[18px]" />
        <p className=" text-sm font-medium">Smeta</p>
      </div>
      <div
        className={cx('flex cursor-pointer flex-col items-center justify-center gap-1 p-2', pathname.split('/')[1].includes('cost') && 'rounded-md bg-black-3')}
        onClick={() => push('/cost')}
      >
        <Icon name="cost" classNameIcon=" w-[18px] h-[18px]" />
        <p className=" text-sm font-medium">Xarajatlar</p>
      </div>
      <div className="w-[50px]">
        <AccountSelector />
      </div>
    </div>
  );
};

export default MobileSidebar;

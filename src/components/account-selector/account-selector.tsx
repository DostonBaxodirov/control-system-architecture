'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, MenuProps } from 'antd';
import cx from 'classnames';

import useAuth from '~/hooks/use-auth';
import { useProjects } from '~/modules/projects';
import { Project } from '~/modules/projects/types';
import { changeProjectId } from '~/store';

import Icon from '../icons/icon';

import cls from './account-selector.module.scss';

// export type AccountDetails = {
//   name: string;
//   id: string;
//   activeSelector?: boolean;
//   open?: boolean;
// };
interface AccountCardProps extends Project {
  onClick: (id: string) => void;
  activeSelector?: boolean;
  open?: boolean;
}

export interface AccountSelectorProps {
  className?: string;
  openAccountSelector?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({ name, id, onClick, activeSelector=false, open }) => (
  <div
    className={cx(
      ' flex cursor-pointer items-center gap-2 rounded-xl bg-white-100 p-1 transition-all duration-200 hover:bg-black-3',
      activeSelector && "bg-black-3",
      open && 'bg-black-5'
    )}
    onClick={() => {
      if (!activeSelector) onClick(id);
    }}
  >
    <div className="flex h-[34px] w-[34px] min-w-[34px] items-center justify-center">
      <p>{name && name[0].toUpperCase()}</p>
    </div>
    <p className="delay-400 inline-block w-full max-w-[70%] overflow-hidden truncate text-ellipsis whitespace-nowrap transition-all ease-linear">{name}</p>
  </div>
);

const AccountSelector: React.FC<AccountSelectorProps> = ({ className, openAccountSelector }) => {
  const [open, setOpen] = useState(false);
  // const { isSidebar } = useUI();
  const wrapperRef = useRef(null);
  // const { user, merchantId } = Hooks.useAuth();
  const dispatch = useDispatch();
  const { projects } = useProjects();
  const { projectId } = useAuth();

  const [selectedAccount, setSelectedAccount] = useState<Project | undefined>(projectId ? projects.filter(item => item.id === projectId)[0] : projects[0]);

  const onClick = async (id: string) => {
    setSelectedAccount(projects.filter(item => item.id === id)[0]);
    dispatch(changeProjectId({ id }));
  };

  useEffect(() => {
    if (projectId) setSelectedAccount(projects.find(item => item.id === projectId));
  }, [projects]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const items: MenuProps['items'] = projects.map((item, idx) => ({
    key: idx,
    label: item.id !== selectedAccount?.id && (
      <div key={item.id} className={cx(idx !== 1 && 'mt-2')}>
        <AccountCard {...item} onClick={onClick} />
      </div>
    )
  }));

  return (
    <div className={cx(cls.wrapper)}>
      <Dropdown
        menu={{ items }}
        dropdownRender={() => (
          <div
            className={cx(
              cls['root-wrapper'],
              'h-[204px] min-w-[208px] translate-x-[0] translate-y-[0px] overflow-y-auto rounded-xl border border-black-20 bg-white-100 p-1 shadow',
              true && 'translate-x-[10px]',
              projects.length! <= 3 && 'h-auto'
            )}
          >
            <AccountCard {...selectedAccount!} onClick={onClick} key={selectedAccount?.id} activeSelector />
            {projects.map(
              (item, idx) =>
                item.id !== selectedAccount?.id && (
                  <div key={item.id} className={cx('mt-2')}>
                    <AccountCard {...item} onClick={onClick} />
                  </div>
                )
            )}
          </div>
        )}
        placement="bottomRight"
        trigger={['click']}
        onOpenChange={() => setOpen(!open)}
        open={!!open}
      >
        <div className="relative border rounded-xl border-black-8" onClick={e => e.stopPropagation()}>
          <AccountCard {...selectedAccount!} onClick={onClick} key={selectedAccount?.id} open={!!open} />
          {projects && projects.length > 1 && (
            <div onClick={() => setOpen(!open)} className={cx('absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer', true && 'right-[-5px] rounded-xl bg-white-100')}>
              <Icon name="open" className={cls.icon} classNameIcon={cx('!w-4 !h-4 transition-all duration-500', openAccountSelector && '!w-3 !h-[17px]')} />
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default AccountSelector;

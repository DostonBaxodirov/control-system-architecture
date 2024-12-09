'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'antd';
import cx from 'classnames';

import { useAuth } from '~/hooks';
import { useProjects } from '~/modules/projects';
import { Project } from '~/modules/projects/types';
import { changeCurrentProject, changeProjectId } from '~/store';

import Icon from '../icons/icon';

import cls from './account-selector.module.scss';
import { Skeleton } from '../skeleton/skeleton';

interface ProjectCardProps extends Project {
  onClick: (id: string) => void;
  activeSelector?: boolean;
  open?: boolean;
}

export interface ProjectSelectorProps {
  className?: string;
  openAccountSelector?: boolean;
}

const AccountCard: React.FC<ProjectCardProps> = ({ name, id, onClick, activeSelector = false, open }) => (
  <div
    className={cx(' flex cursor-pointer items-center gap-2 rounded-xl bg-white-100 p-1 transition-all duration-200 hover:bg-black-3', activeSelector && '!bg-black-3')}
    onClick={() => {
      onClick(id);
    }}
  >
    <div className="flex h-[34px] w-[34px] min-w-[34px] items-center justify-center rounded-lg bg-black-8">
      <p>{name && name[0].toUpperCase()}</p>
    </div>
    <p className="delay-400 inline-block w-full max-w-[70%] overflow-hidden truncate text-ellipsis whitespace-nowrap transition-all ease-linear">{name}</p>
  </div>
);

const AccountSelector: React.FC<ProjectSelectorProps> = ({ openAccountSelector }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { projects, isLoading } = useProjects();
  const { projectId } = useAuth();

  const [selectedAccount, setSelectedAccount] = useState<Project | undefined>(projectId ? projects.filter(item => item.id === projectId)[0] : projects[0]);

  const onClick = async (id: string) => {
    const project = projects.filter(item => item.id === id)[0];

    setSelectedAccount(project);
    dispatch(changeProjectId({ id }));
    dispatch(changeCurrentProject({ project }));
    setOpen(false);
  };

  useEffect(() => {
    if (projectId) {
      setSelectedAccount(projects.find(item => item.id === projectId));
    } else if (projects.length) {
      const project = { ...projects[0] };

      dispatch(changeProjectId({ id: project?.id || '' }));
      dispatch(changeCurrentProject({ project: project! }));
      setSelectedAccount(project);
    }
  }, [projects.length]);

  return (
    <div className={cx(cls.wrapper)}>
      <Dropdown
        dropdownRender={() => (
          <div
            className={cx(
              cls['root-wrapper'],
              'h-[204px] min-w-[208px] translate-x-[0] translate-y-[0px] overflow-y-auto rounded-xl border border-black-20 bg-white-100 p-1 shadow',
              true && 'translate-x-[10px]',
              projects.length! <= 3 && 'h-auto'
            )}
          >
            <AccountCard {...selectedAccount!} onClick={() => setOpen(false)} key={selectedAccount?.id} activeSelector />
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
        onOpenChange={open => {
          if (projects.length) setOpen(open);
        }}
        open={open}
      >
        {isLoading ? (
          <Skeleton className=" h-[42px] w-full" />
        ) : (
          <div className="relative rounded-xl border border-black-8" onClick={e => e.stopPropagation()}>
            {projects.length ? (
              <AccountCard {...selectedAccount!} onClick={onClick} key={selectedAccount?.id} open={!!open} />
            ) : (
              <p className=" delay-400 flex h-[34px] w-full items-center justify-center  text-ellipsis  text-stress-red-main  transition-all ease-linear">
                Sizda hali loyixalar yo'q
              </p>
            )}
            {projects && projects.length > 1 && (
              <div onClick={() => setOpen(!open)} className={cx('absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer', true && 'right-[-5px] rounded-xl bg-white-100')}>
                <Icon name="open" className={cls.icon} classNameIcon={cx('!w-4 !h-4 transition-all duration-500', openAccountSelector && '!w-3 !h-[17px]')} />
              </div>
            )}
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export default AccountSelector;

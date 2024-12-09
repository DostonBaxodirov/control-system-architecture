'use client';

import cx from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import Input from '../input/input';

type TFilter = {
  page: 'plan' | 'cost';
};

const body = (onClick: (key: string, value: string) => void, status: string, search: string, page: 'plan' | 'cost') => (
  <div className=" flex w-full items-center justify-between gap-3">
    {page === 'plan' && (
      <div className=" flex w-full justify-start gap-3">
        <div
          className={cx(
            'flex h-[34px] w-full cursor-pointer items-center gap-1 rounded-xl border border-black-8 bg-white-100 px-2',
            (!status || status === 'ALL') && 'bg-gradient-all'
          )}
          onClick={() => onClick('status', 'ALL')}
        >
          <p className="text-black inline-block text-xs font-medium leading-[14px] tracking-tight">Hammasi</p>
        </div>
        <div
          className={cx(
            'flex h-[34px] w-full cursor-pointer items-center gap-1 rounded-xl border border-black-8 bg-white-100 px-2',
            (!status || status === 'CREATED') && 'bg-gradient-buyer-new'
          )}
          onClick={() => onClick('status', 'CREATED')}
        >
          <p className="text-black inline-block text-xs font-medium leading-[14px] tracking-tight">Yaratilgan</p>
        </div>
        <div
          className={cx(
            'flex h-[34px] w-full cursor-pointer items-center gap-1 rounded-xl border border-black-8 bg-white-100 px-2',
            (!status || status === 'IN_PROGRESS') && 'bg-gradient-processing'
          )}
          onClick={() => onClick('status', 'IN_PROGRESS')}
        >
          <p className="text-black inline-block text-xs font-medium leading-[14px] tracking-tight">Jarayonda</p>
        </div>
        <div
          className={cx(
            'flex h-[34px] w-full cursor-pointer items-center gap-1 rounded-xl border border-black-8 bg-white-100 px-2',
            (!status || status === 'COMPLETED') && 'bg-gradient-completed'
          )}
          onClick={() => onClick('status', 'COMPLETED')}
        >
          <p className="text-black inline-block text-xs font-medium leading-[14px] tracking-tight">Tugallangan</p>
        </div>
      </div>
    )}
    <Input className="h-[34px]" wrapperClass="h-[34px] w-1/3" placeholder="Nomini kiriting..." onChange={e => onClick(`${page}Name`, e.target.value)} defaultValue={search} />
    {/* <Select showSearch/> */}
  </div>
);

export const Filter = ({ page }: TFilter) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parametrni o'zgartirish funksiyasi
  const setQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);

    params.set(key, value);

    // Router orqali URLni yangilash
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return body(setQueryParam, searchParams.get('status') || '', searchParams.get('name') || '', page);
};

'use client';

import { FC } from 'react';
import dayjs from 'dayjs';

import Tag from '~/components/tag/tag';
import { useSingle } from '~/modules/plans/hooks';

interface InfoProps {
  id: string;
}

const Info: FC<InfoProps> = ({ id }) => {
  const { plan } = useSingle(id);

  return (
    <div className=" my-3 flex w-full flex-col">
      <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
        <p className=" w-full p-1 pl-4 text-sm font-medium">Yaratilish vaqti</p>
        <div className=" h-full w-[1px] bg-black-8" />
        <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{dayjs(plan.createAt).format('YYYY-MM-DD')}</p>
      </div>
      <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
        <p className=" w-full p-1 pl-4 text-sm font-medium">Umumiy qiymati</p>
        <div className=" h-full w-[1px] bg-black-8" />
        <p className=" w-full p-1 pl-4 text-left text-sm font-medium">
          {plan.totalAmount} {plan.currency}
        </p>
      </div>
      <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
        <p className=" w-full p-1 pl-4 text-sm font-medium">Smeta rejalar soni</p>
        <div className=" h-full w-[1px] bg-black-8" />
        <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{[plan.countOfSubPlan]}</p>
      </div>
      <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
        <p className=" w-full p-1 pl-4 text-sm font-medium">Status</p>
        <div className=" h-full w-[1px] bg-black-8" />
        <div className="w-full p-1 pl-4 text-sm font-medium">
          <Tag color={plan.status?.variant}>{plan.status?.label}</Tag>
        </div>
      </div>
      <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
        <p className=" w-full p-1 pl-4 text-sm font-medium">Davomiyligi</p>
        <div className=" h-full w-[1px] bg-black-8" />
        <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{plan.duration} kun</p>
      </div>
    </div>
  );
};

export default Info;

import { FC } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

import Tag from '~/components/tag/tag';
import { useCosts } from '~/modules/cost/hooks';
import { usePlans } from '~/modules/plans/hooks';
import { useProjectUsers } from '~/modules/projects';
import { Project } from '~/modules/projects/types';
import { numberFormat } from '~/utils/functions';

interface InfoProps {
  project: Project;
}

const Info: FC<InfoProps> = ({ project }) => {
  const searchParams = useSearchParams();
  const { plans } = usePlans({ status: searchParams.get('status') || '', name: searchParams.get('planName') || '' }, project?.id);

  const { costs } = useCosts({ name: searchParams.get('costName') || '', planId: searchParams.get('planId') || '' }, project?.id);
  const { projectUsers } = useProjectUsers(project?.id);

  return (
    <div className=" mt-4 flex w-full flex-col gap-4">
      <div className=" flex w-full flex-col gap-3 rounded-xl border border-black-8 p-3">
        <p className=" flex w-full items-center justify-start gap-3 text-lg font-normal">
          Xisoblangan{' '}
          <span className="font-medium">
            {project?.estimatedCost} {project?.currency}
          </span>{' '}
          <div className=" h-4 w-4 rounded-full bg-black-8" />
        </p>
        <p className=" flex w-full items-center justify-start gap-3 text-lg font-normal">
          Ishlatilgan{' '}
          <span className="font-medium">
            {' '}
            {project?.spentCost} {project?.currency}
          </span>{' '}
          <div className=" h-4 w-4 rounded-full bg-green-800" />
        </p>
        <div className=" h-5 w-full rounded-full bg-black-8">
          <div
            className=" flex h-5 items-center justify-center rounded-full bg-green-800 text-sm text-white-100"
            style={{ width: `${(project?.spentCost * 100) / (project?.estimatedCost || 1) || 0}%` }}
          >
            {numberFormat((project?.spentCost * 100) / (project?.estimatedCost || 1) || 0)}%
          </div>
        </div>
      </div>
      <div className=" my-3 flex w-full flex-col">
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Yaratilish vaqti</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{dayjs(project?.createdAt).format('YYYY-MM-DD')}</p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Taxminiy qiymati</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">
            {project?.estimatedCost} {project?.currency}
          </p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Ishlatilgan miqdor</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">
            {project?.spentCost} {project?.currency}
          </p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Boshlash vaqti</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{dayjs(project?.startDate).format('YYYY-MM-DD')}</p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Tugash vaqti</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{project?.isEnded ? '--' : dayjs(project?.createdAt).format('YYYY-MM-DD')}</p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Smetalar soni</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{plans.length} ta</p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Xarajatlar soni</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium">{costs.length} ta</p>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Status</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <div className="w-full p-1 pl-4 text-sm font-medium">
            <Tag color={project?.isEnded ? 'green' : 'yellow'}>{project?.isEnded ? 'Tugallangan' : 'Tugallanmagan'}</Tag>
          </div>
        </div>
        <div className=" flex h-[54px] w-full items-center justify-between border-b border-black-8">
          <p className=" w-full p-1 pl-4 text-sm font-medium">Mas'ullar</p>
          <div className=" h-full w-[1px] bg-black-8" />
          <p className=" w-full p-1 pl-4 text-left text-sm font-medium"> {projectUsers.map((item, idx) => `${item.fullName} ${idx !== projectUsers.length - 1 ? ',' : ''}`)}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;

import { Skeleton } from '../skeleton/skeleton';
import Table from '../table/table';

export const TableSkeleton = () => (
  <Table
    dataSource={[{ 1: 1 }, { 2: 2 }, { 3: 3 }, { 4: 4 }, { 5: 5 }]}
    columns={[
      {
        title: <Skeleton className="h-3 w-28 rounded-[3px]" />,
        render: () => <Skeleton className="h-4 w-40 !rounded-[4px]" />
      },
      {
        title: <Skeleton className="h-3 w-28 rounded-[3px]" />,
        render: () => <Skeleton className="h-4 w-40 !rounded-[4px]" />
      },
      {
        title: <Skeleton className="h-3 w-28 rounded-[3px]" />,
        render: () => <Skeleton className="h-4 w-40 !rounded-[4px]" />
      },
      {
        title: <Skeleton className="h-3 w-28 rounded-[3px]" />,
        render: () => <Skeleton className="h-4 w-40 !rounded-[4px]" />
      },
      {
        title: <Skeleton className="h-3 w-28 rounded-[3px]" />,
        render: () => <Skeleton className="h-4 w-40 !rounded-[4px]" />
      }
    ]}
  />
);

import { FC } from 'react';
import dayjs from 'dayjs';

import Table from '~/components/table/table';
import Tag from '~/components/tag/tag';
import { SubPlan } from '~/modules/subPlan/types';

interface SubPlanTableProps {
  subPlans: SubPlan[];
}

const SubPlanTable: FC<SubPlanTableProps> = ({ subPlans }) => (
  <div className=" flex flex-col gap-3">
    <p className="text-lg font-medium">Smeta rejalar</p>
    <Table
      dataSource={subPlans}
      columns={[
        {
          title: 'Nomi',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: 'Yaratilgan vaqti',
          key: 'createdAt',
          dataIndex: 'createdAt',
          render: createdAt => <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
        },
        {
          title: 'Miqdori',
          key: 'quantity',
          dataIndex: 'quantity',
          render: (quantity, record) => (
            <p>
              {quantity} {record.unitOfMeasure}
            </p>
          )
        },
        {
          title: 'Bir birlik narxi',
          key: 'sumOfUnit',
          dataIndex: 'sumOfUnit',
          render: (sumOfUnit, record) => (
            <p>
              {sumOfUnit} {record.currency}
            </p>
          )
        },
        {
          title: 'Umumiy narxi',
          key: 'totalAmount',
          dataIndex: 'totalAmount',
          render: (totalAmount, record) => (
            <p>
              {totalAmount} {record.currency}
            </p>
          )
        },
        {
          title: 'Davomiyligi',
          key: 'duration',
          dataIndex: 'duration',
          render: duration => <p>{duration} kun</p>
        },
        {
          title: 'Turi',
          key: 'type',
          dataIndex: 'type'
          // render: type => <Tag color={type.variant}>{status.label}</Tag>
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: status => <Tag color={status.variant}>{status.label}</Tag>
        }
      ]}
    />
  </div>
);

export default SubPlanTable;

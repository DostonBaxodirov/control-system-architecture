import { FC, useState } from 'react';

import { Button, Icon } from '~/components';
import * as Form from '~/modules/subPlan/forms';
import { SubPlan } from '~/modules/subPlan/types';

interface DropdownRenderProps {
  handleClose: () => void;
  subPlan: SubPlan;
}

const DropdownRender: FC<DropdownRenderProps> = ({ handleClose, subPlan }) => {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  return (
    <div className=" flex flex-col gap-2 rounded-xl border border-black-8 bg-white-100 p-2">
      <Form.DeleteSubPlan
        setLoading={setLoading}
        subPlan={subPlan}
        onSuccess={handleClose}
        children={onClick => (
          <Button intent="default" loading={loading} disabled={updateLoading} onClick={onClick} icon={<Icon classNameIcon="w-3" name="trash" />} size="sm">
            O'chirish
          </Button>
        )}
      />
      <Form.UpdateSubPlan
        setLoading={setUpdateLoading}
        onSuccess={handleClose}
        id={subPlan.id}
        children={onClick => (
          <Button
            intent="default"
            disabled={subPlan.status.value === 'COMPLETED' || loading}
            loading={updateLoading}
            onClick={onClick}
            icon={<Icon classNameIcon="w-3" name="trash" />}
            size="sm"
          >
            {subPlan.status.value === 'CREATED' ? 'Ish boshlash' : <>{subPlan.status.value === 'COMPLETED' ? 'Yakunlangan' : 'Yakunlash'}</>}
          </Button>
        )}
      />
    </div>
  );
};

export default DropdownRender;

import { FC, useState } from 'react';

import { Button, Icon } from '~/components';
import { useAuth } from '~/hooks';
import * as Form from '~/modules/projects/forms';

interface DropdownRenderProps {
  projectId: string;
  handleClose: () => void;
  isEnded: boolean;
}

const DropdownRender: FC<DropdownRenderProps> = ({ projectId, handleClose, isEnded }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuth();

  return (
    <div className=" flex flex-col gap-2 rounded-xl border border-black-8 bg-white-100 p-2">
      <Form.Delete
        setLoading={setDeleteLoading}
        onSuccess={handleClose}
        id={projectId}
        children={onClick => (
          <Button intent="default" disabled={user.role !== 'OWNER'} loading={deleteLoading} onClick={onClick} icon={<Icon classNameIcon="w-3" name="trash" />} size="sm">
            O'chirish
          </Button>
        )}
      />

      <Form.ProjectCompletion
        setLoading={setLoading}
        id={projectId}
        onSuccess={handleClose}
        children={onClick => (
          <Button intent="default" disabled={isEnded} loading={loading} onClick={onClick} icon={<Icon classNameIcon="w-3" name="editText" />} size="sm">
            {isEnded ? 'Tugatilgan' : 'Tugatish'}
          </Button>
        )}
      />
    </div>
  );
};

export default DropdownRender;
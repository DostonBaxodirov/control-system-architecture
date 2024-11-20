import { FC, useState } from 'react';

import { Button, Icon } from '~/components';
import * as Form from '~/modules/team/form';

interface DropdownRenderProps {
  userId: string;
  handleClose: () => void;
  onEdit: () => void;
}

const DropdownRender: FC<DropdownRenderProps> = ({ userId, handleClose, onEdit }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" flex flex-col gap-2 rounded-xl border border-black-8 bg-white-100 p-2">
      <Form.DeleteUser
        setLoading={setLoading}
        userId={userId}
        onSuccess={handleClose}
        children={onClick => (
          <Button intent="default" loading={loading} onClick={onClick} icon={<Icon classNameIcon="w-3" name="trash" />} size="sm">
            O'chirish
          </Button>
        )}
      />

      {/* <Button intent="default" disabled={loading} onClick={onEdit} icon={<Icon classNameIcon="w-3" name="editText" />} size="sm">
        O'zgartish
      </Button> */}
    </div>
  );
};

export default DropdownRender;

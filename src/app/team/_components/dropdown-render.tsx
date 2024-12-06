'use client'

import { FC, useState } from 'react';

import { Button, Icon } from '~/components';
import * as Form from '~/modules/team/form';
import { User } from '~/modules/team/types';

import { AddUpdateUser } from '.';

interface DropdownRenderProps {
  user: User;
  handleClose: () => void;
}

const DropdownRender: FC<DropdownRenderProps> = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" flex flex-col gap-2 rounded-xl border border-black-8 bg-white-100 p-2">
      <Form.DeleteUser
        setLoading={setLoading}
        userId={user.id}
        onSuccess={handleClose}
        children={onClick => (
          <Button intent="default" loading={loading} onClick={onClick} icon={<Icon classNameIcon="w-3" name="trash" />} size="sm">
            O'chirish
          </Button>
        )}
      />

      <AddUpdateUser type="update" selectedUser={user} onSuccess={handleClose} />
    </div>
  );
};

export default DropdownRender;

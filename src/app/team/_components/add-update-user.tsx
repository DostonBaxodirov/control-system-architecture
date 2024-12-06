'use client';

import { FC, useState } from 'react';

import { Button, Icon } from '~/components';
import Modal from '~/components/modal/modal';
import { useAuth } from '~/hooks';
import * as Forms from '~/modules/team/form';
import { User } from '~/modules/team/types';

import UserForm from './user-form';

interface AddUserProps {
  selectedUser?: User;
  onSuccess?: () => void;
  type: 'add' | 'update';
}

const AddUser: FC<AddUserProps> = ({ onSuccess, type,selectedUser }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <Button
        intent="default"
        disabled={loading || (type === 'add' && user.role !== 'OWNER')}
        icon={type === 'update' && <Icon classNameIcon="w-3" name="editText" />}
        size="sm"
        className="w-max"
        onClick={() => setOpen(true)}
      >
        {type === 'add' ? "Qo'shish" : "O'zgartish"}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
        {selectedUser ? (
          <Forms.UpdateUser
            onSuccess={() => {
              setOpen(false);
              onSuccess!();
            }}
            user={selectedUser!}
            setLoading={setLoading}
            children={form => <UserForm setOpen={setOpen} forUpdate loading={loading} form={form} />}
          />
        ) : (
          <Forms.AddUser
            onSuccess={() => {
              setOpen(false);
            }}
            setLoading={setLoading}
            children={form => <UserForm setOpen={setOpen} loading={loading} form={form} />}
          />
        )}
      </Modal>
    </div>
  );
};

export default AddUser;

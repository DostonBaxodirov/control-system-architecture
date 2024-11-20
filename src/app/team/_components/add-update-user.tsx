import { Dispatch, FC, SetStateAction, useState } from 'react';

import Modal from '~/components/modal/modal';
import * as Forms from '~/modules/team/form';
import { User } from '~/modules/team/types';

import UserForm from './user-form';

interface AddUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user?: User;
  onSuccess: () => void;
}

const AddUser: FC<AddUserProps> = ({ open, setOpen, user, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      {user ? (
        <Forms.UpdateUser
          onSuccess={() => {
            setOpen(false);
            onSuccess();
          }}
          user={user}
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
  );
};

export default AddUser;

import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button, Input, Select } from '~/components';
import Modal from '~/components/modal/modal';
import { useRole } from '~/modules/role/hooks';
import * as Forms from '~/modules/team/form';

interface AddUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddUser: FC<AddUserProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { roles, isLoading } = useRole();

  const getRoleOptions = (): { label: string; value: string }[] => {
    let options: { label: string; value: string }[] = [];

    if (roles) {
      options = roles.map(role => ({ label: role.Role, value: role.ID }));
    }

    return options;
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      <Forms.AddUser
        onSuccess={() => {
          setOpen(false);
        }}
        setLoading={setLoading}
        children={({ register, formState: { errors }, control }) => (
          <div className="flex w-full flex-col gap-3">
            <Input
              label={
                <div>
                  Ism familiyani <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              {...register('fullName')}
              placeholder="Ism familiyani kiriting"
              error={errors.fullName?.message}
            />
            <Input
              label={
                <div>
                  Telefon raqam <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              maxLength={9}
              {...register('phone')}
              type="number"
              placeholder="Telefon raqamni kiriting"
              prefixClass="!bg-white-100"
              prefix={<div className="flex cursor-not-allowed items-center gap-2 text-sm font-normal not-italic leading-[16.8px] tracking-[0.14px] text-black-100">+998</div>}
              error={errors.phone?.message}
            />
            <Input {...register('password')} label="Parol" placeholder="Parolni kiriting" error={errors.password?.message} />
            <Select label="Role" placeholder="Role ni tanlang" control={control} name="role" options={getRoleOptions()} error={errors.role?.message} />
            <div className="flex w-full items-center justify-end gap-2">
              <Button size="sm" className="w-max" type="button" intent="default" disabled={loading} onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
              <Button size="sm" type="submit" className="w-max" loading={loading}>
                Yaratish
              </Button>
            </div>
          </div>
        )}
      />
    </Modal>
  );
};

export default AddUser;

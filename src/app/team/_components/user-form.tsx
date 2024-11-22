import { Dispatch, FC, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Input, Select } from '~/components';
import { useRole } from '~/modules/role/hooks';
import { TForm } from '~/modules/team/form';

interface UserFormProps {
  form: UseFormReturn<TForm>;
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  forUpdate?:boolean
}

const UserForm: FC<UserFormProps> = ({ form, loading, setOpen,forUpdate }) => {
  const {
    control,
    register,
    formState: { errors }
  } = form;

  const { roles, isLoading } = useRole();

  const getRoleOptions = (): { label: string; value: string }[] => {
    let options: { label: string; value: string }[] = [];

    if (roles) {
      options = roles.map(role => ({ label: role.role, value: role.id }));
    }


    return options;
  };

  return (
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
      {!forUpdate && <Input {...register('password')} label="Parol" placeholder="Parolni kiriting" error={errors.password?.message} />}
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
  );
};

export default UserForm;

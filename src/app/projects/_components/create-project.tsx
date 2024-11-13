import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button, Input, Select } from '~/components';
import Modal from '~/components/modal/modal';
import { useCurrencyOptions } from '~/hooks';
import * as Forms from '~/modules/projects/forms';

interface CreateProjectProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateProject: FC<CreateProjectProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const options = useCurrencyOptions();

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      <Forms.CreateProject
        onSuccess={() => {
          setOpen(false);
        }}
        setLoading={setLoading}
        children={({ register, formState: { errors }, control }) => (
          <div className="flex w-full flex-col gap-3">
            <Input
              label={
                <div>
                  Loyixa nomi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              {...register('name')}
              placeholder="Loyixa nomini kiriting"
              error={errors.name?.message}
            />
            <Input {...register('startDate')} label="Boshlash vaqti" placeholder="Boshlanish vaqtini kiriting" error={errors.startDate?.message} />
            <Input {...register('location')} label="Joylashuv" placeholder="Joylashuvni kiriting" error={errors.location?.message} />
            <Select
              label={
                <div>
                  Loyixa turi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              placeholder="Loyixa turini tanlang"
              control={control}
              name="type"
              options={[
                { label: 'Dom', value: 'FLAT' },
                { label: 'Uy', value: 'HOUSE' },
                { label: 'Interior dizayn', value: 'INTERIOR_DESIGN' }
              ]}
              error={errors.type?.message}
            />
            <Select
              label={
                <div>
                  Pul birligi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              placeholder="Reja turini tanlang"
              control={control}
              name="currencyId"
              options={options}
              error={errors.type?.message}
            />
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

export default CreateProject;

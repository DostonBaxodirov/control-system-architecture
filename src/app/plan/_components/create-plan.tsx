import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button, Input, Select } from '~/components';
import Modal from '~/components/modal/modal';
import * as Forms from '~/modules/plans/forms';

interface CreatePlanProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatePlan: FC<CreatePlanProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      <Forms.CreatePlan
        onSuccess={() => {
          setOpen(false);
          setLoading(false)
        }}
        setLoading={setLoading}
        children={({ register, formState: { errors }, control, watch }) => (
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
            <Input
              {...register('quantity')}
              label="Soni"
              placeholder="Sonini kiriting"
              error={errors.quantity?.message}
              suffixClass="p-0"
              suffix={
                <Select
                  control={control}
                  name="unitOfMeasure"
                  className="!mb-0 min-w-20"
                  isSuffix
                  options={[
                    { label: 'm', value: 'm' },
                    { label: 'm²', value: 'm²' },
                    { label: 'm³', value: 'm³' },
                    { label: 'kg', value: 'kg' },
                    { label: 'qop', value: 'qop' },
                    { label: 'ta', value: 'ta' }
                  ]}
                />
              }
            />
            <Input
              {...register('sumOfUnit')}
              label={`Bir ${watch('unitOfMeasure')} narxini kiriting`}
              placeholder="Narxini kiriting"
              error={errors.sumOfUnit?.message}
              suffixClass="p-0"
              suffix={
                <Select
                  control={control}
                  name="currency"
                  className="!mb-0 min-w-20"
                  isSuffix
                  options={[
                    { label: 'UZS', value: 'UZS' },
                    { label: 'USD', value: 'USD' }
                  ]}
                />
              }
            />
            <Input
              {...register('duration')}
              label="Davomiyligi"
              placeholder="Reja qilingan vaqtni kiriting"
              error={errors.duration?.message}
              suffixClass="p-0"
              suffix={
                <Select
                  control={control}
                  name="durationOfUnit"
                  className="!mb-0 min-w-20"
                  isSuffix
                  options={[
                    { label: 'kun', value: 'day' },
                    { label: 'hafta', value: 'week' },
                    { label: 'oy', value: 'month' },
                    { label: 'yil', value: 'year' },
                  ]}
                />
              }
            />
            <Select
              label={
                <div>
                  Reja turi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              placeholder="Reja turini tanlang"
              control={control}
              name="type"
              options={[
                { label: 'Maxsulot', value: 'PRODUCT' },
                { label: 'Yetkazib berish', value: 'DELIVERY' },
                { label: 'Quruvchi', value: 'BUILDER' },
                { label: 'Boshqa', value: 'OTHER' }
              ]}
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

export default CreatePlan;

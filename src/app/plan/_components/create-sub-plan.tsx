import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button, Input, Select } from '~/components';
import Modal from '~/components/modal/modal';
import { usePlanOptions } from '~/hooks';
import * as Forms from '~/modules/subPlan/forms';
import { TypeOptions } from '~/utils/constants';
import { useCurrencyOptions } from '~/utils/functions';

interface CreateSubPlanProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  planId?: string;
}

const CreateSubPlan: FC<CreateSubPlanProps> = ({ open, setOpen, planId }) => {
  const [loading, setLoading] = useState(false);
  const options = useCurrencyOptions();
  const planOptions = usePlanOptions();

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      <Forms.CreateSubPlan
        onSuccess={() => {
          setOpen(false);
          setLoading(false);
        }}
        defaultValues={{ planId }}
        setLoading={setLoading}
        children={({ register, formState: { errors }, control, watch }) => (
          <div className="flex w-full flex-col gap-3">
            <Select
              name="planId"
              control={control}
              label={
                <div>
                  Smeta <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              options={planOptions}
              placeholder="Smetani tanlang"
              error={errors.planId?.message}
              disabled={!!planId}
            />
            <Input
              label={
                <div>
                  Reja nomi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              {...register('name')}
              placeholder="Reja nomini kiriting"
              error={errors.name?.message}
            />

            <Input
              {...register('quantity')}
              label="Soni"
              placeholder="Sonini kiriting"
              error={errors.quantity?.message}
              suffixClass="p-0"
              type="number"
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
                    { label: 'ta', value: 'ta' },
                    { label: 'tonna', value: 'tonna' }
                  ]}
                />
              }
            />
            <Input
              {...register('sumOfUnit')}
              label={`Bir "${watch('unitOfMeasure')}" narxini kiriting`}
              placeholder="Narxini kiriting"
              error={errors.sumOfUnit?.message}
              suffixClass="p-0"
              type="number"
              suffix={<Select control={control} name="currencyId" className="!mb-0 min-w-20" isSuffix options={options} />}
            />
            <Input
              {...register('duration')}
              label="Davomiyligi"
              placeholder="Reja qilingan vaqtni kiriting"
              error={errors.duration?.message}
              // suffixClass="p-0"
              type="number"
              suffix={
                'kun'
                // <Select
                //   control={control}
                //   name="durationOfUnit"
                //   className="!mb-0 min-w-20"
                //   isSuffix
                //   options={[
                //     { label: 'kun', value: 'day' },
                //     { label: 'hafta', value: 'week' },
                //     { label: 'oy', value: 'month' },
                //     { label: 'yil', value: 'year' }
                //   ]}
                // />
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
              options={TypeOptions}
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

export default CreateSubPlan;

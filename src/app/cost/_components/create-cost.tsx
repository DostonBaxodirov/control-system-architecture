import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Checkbox } from 'antd';

import { Button, Input, Select, TextArea } from '~/components';
import Modal from '~/components/modal/modal';
import { useCurrencyOptions, usePlanOptions } from '~/hooks';
import * as Forms from '~/modules/cost/forms';
import { usePlans } from '~/modules/plans/hooks';
import { TypeOptions } from '~/utils/constants';

interface CreateCostProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateCost: FC<CreateCostProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [costOptions, setCostOptions] = useState<{ label: string; value: string }[]>([]);
  const { plans } = usePlans();
  const options = useCurrencyOptions();
  const planOptions = usePlanOptions();
  const getPlanOptions = (): { label: string; value: string }[] => plans.map(item => ({ label: item.name, value: item.id }));

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Xarajat yaratish</p>}>
      <Forms.CreateCost
        onSuccess={() => {
          setOpen(false);
          setLoading(false);
        }}
        setCostOptions={setCostOptions}
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
            />
            <Checkbox value={isManual} onChange={e => setIsManual(e.target.checked)}>
              Qo'lda kiritish
            </Checkbox>
            {!isManual && (
              <Select
                name="name"
                control={control}
                label={
                  <div>
                    Xarajat nomi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                  </div>
                }
                disabled={!watch('planId')}
                options={costOptions}
                placeholder="Xarajatni tanlang"
                error={errors.name?.message}
              />
            )}

            {isManual && (
              <Input
                label={
                  <div>
                    Xarajat nomi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                  </div>
                }
                {...register('name')}
                placeholder="Xarajat nomini kiriting"
                error={errors.name?.message}
              />
            )}
            <Input
              {...register('amount')}
              label="Narxi"
              placeholder="Qiymatini kiriting"
              error={errors.amount?.message}
              suffixClass="p-0"
              suffix={<Select control={control} name="currencyId" className="!mb-0 min-w-20" isSuffix options={options} />}
            />
            <TextArea {...register('reason')} rows={3} label="Sabab" placeholder="Sababni kiriting" error={errors.reason?.message} />
            <Select
              label={
                <div>
                  Xarajat turi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              placeholder="Xarajat turini tanlang"
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

export default CreateCost;

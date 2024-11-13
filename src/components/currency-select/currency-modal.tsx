import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button, Input } from '~/components';
import Modal from '~/components/modal/modal';
import { AddEditCurrency, TForm } from '~/modules/currency/forms';

interface CreateUpdateCurrencyProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  clearEditCurrency:()=>void
  currencyId?: string;
  defaultValues?: TForm;
}

const CreateUpdateCurrency: FC<CreateUpdateCurrencyProps> = ({ open,clearEditCurrency, setOpen, defaultValues, currencyId }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
      <AddEditCurrency
        onSuccess={() => {
          setOpen(false);
          clearEditCurrency()
        }}
        currencyId={currencyId}
        defaultValues={defaultValues}
        setLoading={setLoading}
        children={({ register, formState: { errors } }) => (
          <div className="flex w-full flex-col gap-3">
            <Input
              label={
                <div>
                  Pul birligi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              {...register('name')}
              disabled={!!currencyId}
              placeholder="Pul birligini kiriting"
              error={errors.name?.message}
            />
            <Input
              label={
                <div>
                  Qiymati <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                </div>
              }
              suffix="UZS"
              {...register('amount')}
              placeholder="Qiymatini kiriting"
              error={errors.name?.message}
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

export default CreateUpdateCurrency;

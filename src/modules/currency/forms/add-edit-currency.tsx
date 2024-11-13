import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferType } from 'yup';

import { toast } from '~/components';
import { http } from '~/services';

import { addEditCurrencySchema } from './schema';

export type TForm = InferType<typeof addEditCurrencySchema>;

export interface AddEditCurrencyProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (form: UseFormReturn<TForm>) => ReactNode;
  currencyId?: string;
  defaultValues?: TForm;
}

const AddEditCurrency: FC<AddEditCurrencyProps> = ({ children, setLoading, onSuccess, currencyId, defaultValues }) => {
  const queryClient = useQueryClient();
  const form = useForm<TForm>({ resolver: yupResolver(addEditCurrencySchema), defaultValues });

  const mutation = useMutation<any, string, TForm>({
    mutationFn: async values => {
      if (!currencyId) {
        const { data } = await http.post('/currency', { currency: values.name, amount: values.amount });

        return data;
      }
      const { data } = await http.put('/currency', { id: currencyId, amount: values.amount });

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['CURRENCIES'] });
      toast.success(`Valyuta muvofaqiyatli ${currencyId ? "o'zgartirildi" : 'yaratildi'}`);
      onSuccess();
      setLoading(false);
      form.reset();
    },
    onError: () => {
      toast.error("Nimadur xato ketdi, qayta urunib ko'ring");
      setLoading(false);
    }
  });

  const onSubmit = (data: TForm) => {
    mutation.mutateAsync(data);
    setLoading(true);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default AddEditCurrency;

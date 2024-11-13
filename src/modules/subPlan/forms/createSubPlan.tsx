import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferType } from 'yup';

import { toast } from '~/components';
import { useCurrency } from '~/modules/currency/hooks';
import { http } from '~/services';

import { createSubPlanSchema } from './schema';

type TForm = InferType<typeof createSubPlanSchema>;

interface CreateSubPlanProps {
  onSuccess: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (form: UseFormReturn<TForm>) => ReactNode;
  defaultValues?: Partial<TForm>;
}

const CreateSubPlan: FC<CreateSubPlanProps> = ({ children, setLoading, onSuccess, defaultValues }) => {
  const { currencies } = useCurrency();
  const form = useForm<TForm>({ resolver: yupResolver(createSubPlanSchema), defaultValues: { ...defaultValues, currencyId: currencies[0].id, unitOfMeasure: 'm' } });
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.post('/subPlan', { ...values });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['SUBPLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      onSuccess();
      toast.success('Muvofaqiyatli yaratildi.');
    },
    onError: () => {
      toast.error("Nimadur xato ketdi, qayta urunib ko'ring.");
      setLoading(false);
    }
  });

  const onSubmit = (data: TForm) => {
    setLoading(true);
    mutation.mutateAsync(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default CreateSubPlan;

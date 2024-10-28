import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferType } from 'yup';

import { toast } from '~/components';
import useAuth from '~/hooks/use-auth';
import { http } from '~/services';

import { createPlanSchema } from './schema';

type TForm = InferType<typeof createPlanSchema>;

interface CreatePlanProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (form: UseFormReturn<TForm>) => ReactNode;
}

const CreatePlan: FC<CreatePlanProps> = ({ setLoading, onSuccess, children }) => {
  const queryClient = useQueryClient();
  const { userId, projectId } = useAuth();
  const defaultValues = { unitOfMeasure: 'm', durationOfUnit: 'day', currency: 'UZS' };
  const form = useForm<TForm>({ resolver: yupResolver(createPlanSchema), defaultValues });

  const mutation = useMutation<unknown, string, TForm>({
    mutationFn: async ({ name, sumOfUnit, duration, durationOfUnit, unitOfMeasure, type, quantity, currency }) => {
      const totalAmount = quantity * sumOfUnit;
      const { data } = await http.post('/plan', {
        name,
        projectId,
        userId,
        type,
        duration: `${duration}${durationOfUnit}`,
        sumOfUnit,
        currency,
        totalAmount,
        unitOfMeasure,
        quantity
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PLANS'] });
      toast.success('Reja muvofaqiyatli yaratildi.');
      onSuccess();
    },
    onError:()=>{
      setLoading(false)
      toast.error("Nimadur xato ketdi, qayta urunib ko'ring.")
    }
  });

  const onSubmit = (data: TForm) => {
    setLoading(true);
    mutation.mutateAsync(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default CreatePlan;

import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferType } from 'yup';

import { toast } from '~/components';
import { useAuth } from '~/hooks';
import { useSubPlans } from '~/modules/subPlan/hooks';
import { http } from '~/services';

import { createCostSchema } from './schema';

type TForm = InferType<typeof createCostSchema>;
interface CreateCostProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCostOptions: Dispatch<SetStateAction<{ label: string; value: string }[]>>;
  children: (form: UseFormReturn<TForm>) => ReactNode;
  onSuccess: () => void;
}
const CreateCost: FC<CreateCostProps> = ({ setLoading, children, onSuccess, setCostOptions }) => {
  const queryClient = useQueryClient();
  const { projectId } = useAuth();
  const form = useForm<TForm>({ resolver: yupResolver(createCostSchema) });

  const { subPlans } = useSubPlans(form.watch('planId'));

  useEffect(() => {
    setCostOptions(() => subPlans.map(item => ({ label: item.name, value: item.name })));
  }, [form.watch('planId'),subPlans]);

  const mutation = useMutation<unknown, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.post('/cost', { ...values, projectId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['COSTS'] });
      toast.success('Muvofaqiyatli yaratildi.');
      setLoading(false);
      form.reset();
      onSuccess();
    },
    onError: () => {
      toast.error('Nimadur xato ketdi.');
      setLoading(false);
    }
  });

  const onSubmit = (data: TForm) => {
    mutation.mutateAsync(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default CreateCost;

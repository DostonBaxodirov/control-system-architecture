import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { InferType } from 'yup';

import { useAuth } from '~/hooks';
import { http } from '~/services';

import { createProjectSchema } from './schema';

type TForm = InferType<typeof createProjectSchema>;

interface CreateProjectProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (form: UseFormReturn<TForm>) => ReactNode;
}

const CreateProject: FC<CreateProjectProps> = ({ children, setLoading, onSuccess }) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const form = useForm<TForm>({ resolver: yupResolver(createProjectSchema) });

  const mutation = useMutation<unknown, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.post('/project', { ...values, userId, startDate: dayjs(values.startDate).format('YYYY.MM.DD') });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      toast.success('Loyixa muvofaqiyatli yaratildi!');
      onSuccess();
      setLoading(false);
      form.reset();
    },
    onError: () => {
      toast.error("Nimadur xato ketdi iltimos qayta urunib ko'ring");
      setLoading(false);
    }
  });

  const onSubmit = (data: TForm) => {
    setLoading(true);
    mutation.mutateAsync(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default CreateProject;

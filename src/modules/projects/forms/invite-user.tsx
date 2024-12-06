import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { InferType } from 'yup';

import { http } from '~/services';

import { inviteUserSchema } from './schema';

type TForm = InferType<typeof inviteUserSchema>;

interface InviteUserProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  projectId: string;
  children: (form: UseFormReturn<TForm>) => ReactNode;
}

const InviteUser: FC<InviteUserProps> = ({ children, setLoading, onSuccess, projectId }) => {
  const queryClient = useQueryClient();
  const form = useForm<TForm>({ resolver: yupResolver(inviteUserSchema) });

  const mutation = useMutation<unknown, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.post('/user-projects', { projectId, userId: values.userId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      toast.success('Foydalanuvchi muvofaqiyatli yaratildi.');
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

export default InviteUser;

import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferType } from 'yup';

import { toast } from '~/components';
import { http } from '~/services';

import { addUserSchema } from './schema';

interface AddUserProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (form: UseFormReturn<TForm>) => ReactNode;
}

type TForm = InferType<typeof addUserSchema>;
const AddUser: FC<AddUserProps> = ({ children, setLoading,onSuccess }) => {
  const queryClient = useQueryClient();
  const form = useForm<TForm>({ resolver: yupResolver(addUserSchema) });

  const mutation = useMutation<any, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.post('/user', { fullName: values.fullName, password: values.password, phoneNumber: values.phone, roleId: values.role });

      return data;
    },
    onSuccess: async values => {
      await queryClient.invalidateQueries({ queryKey: ['USERS'] });
      toast.success('Foydalanuvchi muvofaqiyatli yaratildi!');
      setLoading(false);
      onSuccess()
    },
    onError: () => {
      toast.error("Nimadur xato bo'ldi. Iltimos qayta urunib ko'ring");
      setLoading(false);
    }
  });

  const onSubmit = (data: TForm) => {
    setLoading(true);
    mutation.mutateAsync(data);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default AddUser;

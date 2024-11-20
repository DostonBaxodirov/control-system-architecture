import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '~/components';
import { useRole } from '~/modules/role/hooks';
import { http } from '~/services';

import { User } from '../types';

import { TForm } from './add-user';
import { addUserSchema } from './schema';

interface UpdateUserProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (form: UseFormReturn<TForm>) => ReactNode;
  user: User;
}

const UpdateUser: FC<UpdateUserProps> = ({ children, setLoading, onSuccess, user }) => {
  const queryClient = useQueryClient();
  const { roles } = useRole();
  const getRoleId = (role: string): string => roles.filter(item => item.role === role)[0]?.id;

  const form = useForm<TForm>({
    resolver: yupResolver(addUserSchema),
    defaultValues: { fullName: user.fullName, password: user.password, phone: user.phoneNumber, role: getRoleId(user.role) }
  });

  const mutation = useMutation<any, string, TForm>({
    mutationFn: async values => {
      const { data } = await http.put('/user', { fullName: values.fullName, password: values.password, phoneNumber: values.phone, roleId: values.role, id: user.id });

      return data;
    },
    onSuccess: async values => {
      await queryClient.invalidateQueries({ queryKey: ['USERS'] });
      toast.success('Foydalanuvchi muvofaqiyatli yanglilandi!');
      setLoading(false);
      onSuccess();
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

export default UpdateUser;

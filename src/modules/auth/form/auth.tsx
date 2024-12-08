import { FC, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InferType } from 'yup';

import { toast } from '~/components';
import { config } from '~/config';
import { login, useDispatch } from '~/store';

import { authSchema } from './schema';

type TForm = InferType<typeof authSchema>;

interface AuthProps {
  component: (form: UseFormReturn<TForm>) => ReactNode;
}

const Auth: FC<AuthProps> = ({ component }) => {
  const { push } = useRouter();
  const form = useForm<TForm>({ resolver: yupResolver(authSchema) });
  const dispatch = useDispatch();

  const mutation = useMutation<any, string, TForm>({
    mutationFn: async values => {
      const { data } = await axios.post(`${config.backend.baseURL}/login`, { phoneNumber: `998${values.phone}`, password: values.password });

      return data;
    },
    onSuccess: async values => {
      await localStorage.setItem('accessToken', values.accessToken);
      await dispatch(login({ userId: values.user.id, user: values.user }));
      await push('/team');
      toast.success('Logged in successfully!');
    },
    onError: (err: any) => {
      if (err.response.status === 404) {
        toast.error("Kechirasiz bunday foydalanuvchi tizimda yo'q.");
      }
    }
  });

  const onSubmit = (data: TForm) => {
    mutation.mutateAsync({ ...data });
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{component(form)}</form>;
};

export default Auth;

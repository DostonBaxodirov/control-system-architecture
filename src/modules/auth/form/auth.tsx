import { FC, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { InferType } from 'yup';

import { authSchema } from './schema';

type TForm = InferType<typeof authSchema>;

interface AuthProps {
  component: (form: UseFormReturn<TForm>) => ReactNode;
}

const Auth: FC<AuthProps> = ({ component }) => {
  const { push } = useRouter();
  const form = useForm<TForm>({ resolver: yupResolver(authSchema) });

  const mutation = useMutation<any, string, TForm>({
    mutationFn: async values => {
      const { data } = await axios.post('http://localhost:8080/login', { phoneNumber: `998${values.phone}`, password: values.password });

      return data;
    },
    onSuccess: values => {
      toast.success('Logged in successfully!');
      localStorage.setItem('accessToken', values.AccessToken);
      push('/team');
      console.log('values', values);
    },
    onError: () => {
      toast.error('Something is wrong please try again.');
    }
  });

  const onSubmit = (data: TForm) => {
    mutation.mutateAsync({ ...data });
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{component(form)}</form>;
};

export default Auth;

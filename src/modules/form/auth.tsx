import { FC, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { InferType } from 'yup';

import { authSchema } from './schema';

type TForm = InferType<typeof authSchema>;

interface AuthProps {
  component: (form: UseFormReturn<TForm>) => ReactNode;
}

const Auth: FC<AuthProps> = ({ component }) => {
  const { push } = useRouter();
  const form = useForm<TForm>({ resolver: yupResolver(authSchema) });

  const onSubmit = () => {
    push('/team');
    console.log('submitted');
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{component(form)}</form>;
};

export default Auth;

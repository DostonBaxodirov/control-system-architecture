import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { InferType } from 'yup';

import { useAuth } from '~/hooks';
import { http } from '~/services';

interface CompleteProjectProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (onClick: () => void) => ReactNode;
  id: string;
}

const CompleteProject: FC<CompleteProjectProps> = ({ children, setLoading, id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, string>({
    mutationFn: async () => {
      const { data } = await http.put(`/project/complete/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      toast.success('Loyixa muvofaqiyatli yaratildi!');
      setLoading(false);
    },
    onError: () => {
      toast.error("Nimadur xato ketdi iltimos qayta urunib ko'ring");
      setLoading(false);
    }
  });

  const onClick = () => {
    setLoading(true);
    mutation.mutateAsync();
  };

  return <>{children(onClick)}</>;
};

export default CompleteProject;

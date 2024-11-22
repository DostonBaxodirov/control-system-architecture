import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { http } from '~/services';

interface DeleteProjectProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (onClick: () => void) => ReactNode;
  id: string;
  onSuccess: () => void;
}

const DeleteProject: FC<DeleteProjectProps> = ({ children, setLoading, id, onSuccess }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, string>({
    mutationFn: async () => {
      const { data } = await http.delete(`/project/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      toast.success('Loyixa muvofaqiyatli yaratildi!');
      setLoading(false);
      onSuccess();
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

export default DeleteProject;

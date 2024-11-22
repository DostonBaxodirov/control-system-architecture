import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '~/components';
import { http } from '~/services';

interface DeleteSubPlanProps {
  onSuccess: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (onClick: () => void) => ReactNode;
  id:string
}

const DeleteSubPlan: FC<DeleteSubPlanProps> = ({ children, setLoading, onSuccess,id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, string>({
    mutationFn: async () => {
      const { data } = await http.delete(`/subPlan/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['SUBPLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['PROJECTS'] });
      onSuccess();
      toast.success("Muvofaqiyatli O'chirildi.");
    },
    onError: () => {
      toast.error("Nimadur xato ketdi, qayta urunib ko'ring.");
      setLoading(false);
    }
  });

  const onClick = () => {
    setLoading(true);
    mutation.mutateAsync();
  };

  return <>{children(onClick)}</>;
};

export default DeleteSubPlan;

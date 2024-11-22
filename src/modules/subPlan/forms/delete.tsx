import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '~/components';
import { useAuth } from '~/hooks';
import { http } from '~/services';

import { SubPlan } from '../types';

interface DeleteSubPlanProps {
  onSuccess: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (onClick: () => void) => ReactNode;
  subPlan: SubPlan;
}

const DeleteSubPlan: FC<DeleteSubPlanProps> = ({ children, setLoading, onSuccess, subPlan }) => {
  const queryClient = useQueryClient();
  const { projectId } = useAuth();
  const mutation = useMutation<unknown, string>({
    mutationFn: async () => {
      const { data } = await http.delete(`/subPlan/`, { data: { id: subPlan.id, duration: subPlan.duration, amount: subPlan.totalAmount, planId: subPlan.planId, projectId } });
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

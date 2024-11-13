import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { http } from '~/services';

interface UpdatePlanProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  planId: string;
  status: string;
  children: (onClick: () => void) => ReactNode;
}

const UpdatePlan: FC<UpdatePlanProps> = ({ planId, status, setLoading, children }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await http.put('/plan/status', { planId, status });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['PLANS', planId] });
      toast.success("Muvofaqiyatli o'zgartirildi.");
      setLoading(false);
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

export default UpdatePlan

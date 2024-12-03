import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '~/components';
import { http } from '~/services';

interface UpdateSubPlanProps {
  onSuccess: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: (onClick: () => void) => ReactNode;
  id: string;
  status: string;
}

const UpdateSubPlan: FC<UpdateSubPlanProps> = ({ children, setLoading, onSuccess, id, status }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, string>({
    mutationFn: async () => {
      const { data } = await http.put(`/subPlan/status`, { id, status });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['SUBPLANS'] });
      await queryClient.invalidateQueries({ queryKey: ['PLANS'] });
      onSuccess();
      toast.success("Muvofaqiyatli O'chirildi.");
      setLoading(false)
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

export default UpdateSubPlan;

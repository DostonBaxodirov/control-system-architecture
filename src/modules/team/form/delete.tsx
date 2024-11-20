import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '~/components';
import { http } from '~/services';

interface DeleteUserProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  children: (onClick: () => void) => ReactNode;
  userId: string;
}

const DeleteUser: FC<DeleteUserProps> = ({ children, setLoading, onSuccess, userId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, string>({
    mutationFn: async () => {
      const { data } = await http.delete(`/user/${userId}`);

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['USERS'] });
      toast.success("Foydalanuvchi muvofaqiyatli o'chirildi!");
      setLoading(false);
      onSuccess();
    },
    onError: () => {
      toast.error("Nimadur xato bo'ldi. Iltimos qayta urunib ko'ring");
      setLoading(false);
    }
  });

  const onClick = () => {
    setLoading(true);
    mutation.mutateAsync();
  };

  return <>{children(onClick)}</>;
};

export default DeleteUser;

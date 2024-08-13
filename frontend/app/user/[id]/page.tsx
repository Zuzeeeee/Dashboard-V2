'use client';

import { columns } from '@/app/user/[id]/data';
import { getCard, getUser } from '@/app/utils/utils';
import { UserEdit } from '@/components/dashboard/userEdit/userEdit';
import { UserForm } from '@/components/dashboard/userForm/userForm';
import { DataTable } from '@/components/ui/data-table';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';

const UserView = ({ params }: { params: { id: string } }) => {
  const {
    data: userData,
    isFetching,
    isLoading,
    isError,
    error: errorCep,
    status,
    refetch,
  } = useQuery({
    queryKey: ['users', `${params.id}`],
    queryFn: getUser,
    enabled: true,
  });

  const {
    data: dataCard,
    isLoading: isLoadingCard,
    refetch: refetchCard,
  } = useQuery({
    queryKey: ['id', `${params.id}`],
    queryFn: getCard,
    enabled: true,
  });

  if (isLoading) {
    return;
  }

  return (
    <div>
      <UserEdit
        defaultValues={userData?.data[0]}
        dataCard={dataCard?.data}
      ></UserEdit>
    </div>
  );
};

export default UserView;

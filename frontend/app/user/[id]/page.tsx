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
    queryKey: ['cards', `${params.id}`],
    queryFn: getCard,
    enabled: true,
  });

  if (isLoading) {
    return;
  }

  return (
    <div className='flex align-items-center '>
      <div className='flex justify-center items-center  flex-wrap my-8 w-full'>
        <div className='bg-white p-4 rounded-md drop-shadow-md min-w-[320px] max-w-[600px] '>
          <UserEdit
            defaultValues={userData?.data[0]}
            dataCard={dataCard?.data}
          ></UserEdit>
        </div>
      </div>
    </div>
  );
};

export default UserView;

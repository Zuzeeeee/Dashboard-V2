'use client';
import { columns } from '@/app/dashboard/data';
import { getUsers } from '@/app/utils/utils';
import { DataTable } from '@/components/ui/data-table';
import { useQuery } from '@tanstack/react-query';

export default function UserTable() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: true,
  });
  if (!userData) {
    return;
  }
  return (
    <DataTable
      columns={columns}
      data={userData?.data}
      isLoading={isLoading}
      isFilterable
    />
  );
}

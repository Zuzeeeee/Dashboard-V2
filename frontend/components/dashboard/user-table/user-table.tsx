'use client';
import { columns } from '@/app/dashboard/data';
import { getUsers } from '@/app/utils/utils';
import { DataTable } from '@/components/ui/data-table';
import { useQuery } from '@tanstack/react-query';
import { VisibilityState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export default function UserTable() {
  const columnVisible: VisibilityState = {};
  const { data: userData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: true,
  });
  if (!userData) {
    return;
  }

  if (window.outerWidth < 600) {
    columnVisible[columns[2].id ?? ''] = false;
    if (window.outerWidth < 400) {
      columnVisible[columns[1].id ?? ''] = false;
    }
  }

  return (
    <div className='bg-white rounded-md drop-shadow-md'>
      <DataTable
        columns={columns}
        data={userData?.data}
        isLoading={isLoading}
        columnsInitialVisibility={columnVisible}
        isFilterable
      />
    </div>
  );
}

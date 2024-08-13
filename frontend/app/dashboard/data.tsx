'use client';

import { User } from '@/app/types';
import { DeleteAlert } from '@/components/dashboard/deleteAlert/deleteAlert';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          <span>Name</span>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.name} {row.original.surname}
        </span>
      );
    },
    enableHiding: false,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          <span>Email</span>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'birthDate',
    accessorKey: 'birthDate',
    header: () => <span>Birth Date</span>,
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.original.birthDate)?.toLocaleDateString('pt-BR')}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => (
      <Link href='/user/add' className='w-full'>
        <Button className='w-full my-2'>
          {window.outerWidth > 500 ? (
            'Add New User'
          ) : (
            <span className='font-weight-bold'>New User</span>
          )}
        </Button>
      </Link>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const normalClass = 'flex gap-2';
      const smallClass = 'flex flex-col gap-2';
      return (
        <div className={window.outerWidth > 500 ? normalClass : smallClass}>
          <Link className='w-full' href={`/user/${user.id}`}>
            <Button className='w-full'>View</Button>
          </Link>
          <DeleteAlert id={user.id}>Delete</DeleteAlert>
        </div>
      );
    },
    enableColumnFilter: false,
    enableHiding: false,
  },
];

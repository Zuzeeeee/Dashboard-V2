'use client';

import { User } from '@/app/types';
import { DeleteAlert } from '@/components/dashboard/deleteAlert/deleteAlert';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export const MockUser: Partial<User>[] = [
  {
    id: '1',
    name: 'José',
    surname: 'Alves',

    email: 'josealves7jk@gmail.com',
    birthDate: new Date(),
  },
  {
    id: '2',
    name: 'João ',
    surname: 'Alves',
    email: 'josealves7jk@gmail.com',
    birthDate: new Date(),
  },
  {
    id: '3',
    name: 'José',
    surname: 'Figueiredo',
    email: 'josealves7jk@gmail.com',
    birthDate: new Date(),
  },
];

export const columns: ColumnDef<Partial<User>>[] = [
  {
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
    accessorKey: 'birthDate',
    header: () => <span>Birth Date</span>,
    cell: ({ row }) => {
      return <span>{row.original.birthDate?.toLocaleDateString('pt-BR')}</span>;
    },
  },
  {
    id: 'actions',
    header: () => (
      <Link href='/user/add'>
        <Button>Add New User</Button>
      </Link>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <Link href={`/user/${user.id}`}>
            <Button className='mr-2'>View</Button>
          </Link>
          <DeleteAlert>Delete</DeleteAlert>
        </div>
      );
    },
    enableColumnFilter: false,
    enableHiding: false,
  },
];

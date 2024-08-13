'use client';

import { Card, User } from '@/app/types';
import { CardDialog } from '@/components/dashboard/cardDialog/cardDialog';
import { DeleteAlert } from '@/components/dashboard/deleteAlert/deleteAlert';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: 'number',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-2'
        >
          <span>Number</span>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className='text-center'>
          ●●●● {row.original.number.slice(-4)}
        </span>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: 'expireDate',
    header: () => <span>Expire Date</span>,
    cell: ({ row }) => {
      {
        return new Date(row.original.expireDate)?.toLocaleDateString('pt-BR', {
          month: '2-digit',
          year: '2-digit',
        });
      }
    },
  },
  {
    id: 'actions',
    header: () => <CardDialog buttonStyle='my-2'></CardDialog>,
    cell: ({ row }) => {
      const card = row.original;
      return (
        <div>
          <DeleteAlert type='card' id={card.id}>
            Delete
          </DeleteAlert>
        </div>
      );
    },

    enableColumnFilter: false,
    enableHiding: false,
  },
];

'use server';

import { DataTable } from '@/components/ui/data-table';
import { columns, MockUser } from '@/app/dashboard/data';
import { CardDialog } from '@/components/dashboard/cardDialog/cardDialog';

const Dashboard = async () => {
  return (
    <div className='flex align-items-center'>
      <div className='flex justify-center'>
        <DataTable columns={columns} data={MockUser} />
      </div>
    </div>
  );
};

export default Dashboard;

'use server';

import UserTable from '@/components/dashboard/user-table/user-table';

const Dashboard = async () => {
  return (
    <div className='flex align-items-center'>
      <div className='flex justify-center'>
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;

'use server';

import UserTable from '@/components/dashboard/user-table/user-table';

const Dashboard = async () => {
  return (
    <div className='flex align-items-center w-full h-full bg-slate-100'>
      <div className='flex justify-center items-center w-full  flex-wrap h-[80%]'>
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;

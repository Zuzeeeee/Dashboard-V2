import { UserForm } from '@/components/dashboard/userForm/userForm';

const AddUser = () => {
  return (
    <div className='flex align-items-center '>
      <div className='flex justify-center items-center  flex-wrap my-8 w-full'>
        <div className='bg-white p-4 rounded-md drop-shadow-md min-w-[320px] max-w-[600px] '>
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default AddUser;

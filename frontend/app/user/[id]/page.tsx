'use client';
import { MockUser } from '../../dashboard/data';
import { UserForm } from '@/components/dashboard/userForm/userForm';

const UserView = () => {
  return (
    <div>
      <UserForm defaultValues={MockUser[0]}></UserForm>
    </div>
  );
};

export default UserView;

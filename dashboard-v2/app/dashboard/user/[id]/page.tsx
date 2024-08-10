'use client';
import { MockUser } from '../../data';
import { UserForm } from '@/components/dashboard/userForm/userForm';

const UserView = () => {
  return (
    <div>
      <UserForm defaultValues={MockUser[0]}></UserForm>
    </div>
  );
};

export default UserView;

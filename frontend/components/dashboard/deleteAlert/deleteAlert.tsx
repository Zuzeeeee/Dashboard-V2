import { deleteCard, deleteUser } from '@/app/utils/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export interface DeleteAlertProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'card' | 'user';
  id: string;
}

export const DeleteAlert = ({
  onClick,
  children,
  type = 'user',
  id,
}: DeleteAlertProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: mutateUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      if (data && data.errors) {
        toast({ title: 'Something went wrong.', description: data.message });
        return;
      }
      toast({ title: 'User deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    },
  });

  const { mutate: mutateCard } = useMutation({
    mutationFn: deleteCard,
    onSuccess: (data) => {
      console.log(data);
      if (data && data.errors) {
        toast({ title: 'Something went wrong.', description: data.message });
        return;
      }
      toast({ title: 'Card deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setOpen(false);
    },
  });

  const handleClick = () => {
    onClick?.();
    if (type === 'user') {
      mutateUser(id);
      return;
    }
    if (type === 'card') {
      mutateCard(id);
      return;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClick()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

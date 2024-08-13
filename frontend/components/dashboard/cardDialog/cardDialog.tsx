'use client';
import { Card } from '@/app/types';
import { CardFields, saveCard } from '@/app/utils/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from '@radix-ui/react-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  number: z
    .string({ required_error: 'Number is required.' })
    .min(13, 'Number of the card must be at least 13 numbers.')
    .max(16, 'Number of the card must be at maximum 16 numbers.'),
  cvv: z
    .string({ required_error: 'Cvv is required.' })
    .min(3, 'CVV must have 3 numbers.')
    .max(3, 'Cvv must have 3 numbers.'),
  expireDate: z
    .date({
      required_error: 'A expire date for the card is required.',
    })
    .refine((expireDate) => expireDate > new Date(), {
      message: 'The card is expired.',
    }),
  user_id: z.string({ required_error: 'User is missing.' }),
});

interface CardDialogProps {
  defaultValues?: Card;
  buttonStyle?: React.ComponentProps<'button'>['className'];
}

export const CardDialog = ({ defaultValues, buttonStyle }: CardDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState<boolean>(false);
  const params = useParams();
  const formCard = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? { ...defaultValues }
      : {
          number: '',
          cvv: '',
          expireDate: undefined,
          user_id: params.id[0] ?? '',
        },
    reValidateMode: 'onChange',
  });

  const { mutate } = useMutation({
    mutationFn: saveCard,
    onSuccess: (data) => {
      if (data && data.errors) {
        (Object.keys(data.errors) as CardFields[]).map((value) => {
          formCard.setError(value, {
            type: 'api',
            message: data.errors[value][0],
          });
        });
        return;
      }
      toast({ title: 'Card created successfully.' });
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      formCard.reset();
      setOpen(false);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonStyle}>Add card</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[375px] max-w-[300px] rounded'>
        <Form key={2} {...formCard}>
          <form
            onSubmit={formCard.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <DialogHeader>
              <DialogTitle>New card</DialogTitle>
              <DialogDescription>
                Add a new card for this user. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-2'>
              <FormField
                control={formCard.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-right'>Number</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' {...field} maxLength={16} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCard.control}
                name='cvv'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-right'>CVV</FormLabel>
                    <FormControl>
                      <Input
                        className='col-span-3 max-w-[100px]'
                        {...field}
                        maxLength={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={formCard.control}
              name='expireDate'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel>Expire Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            ' pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className='flex justify-between align-it w-full'>
                <DialogClose asChild>
                  <Button variant='secondary'>Close</Button>
                </DialogClose>

                <Button>Save card</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

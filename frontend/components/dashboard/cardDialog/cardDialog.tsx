'use client';
import { Card } from '@/app/types';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
});

interface CardDialogProps {
  defaultValues?: Partial<Card>;
}

export const CardDialog = ({ defaultValues }: CardDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? { ...defaultValues }
      : {
          number: '',
          cvv: '',
          expireDate: undefined,
        },
    reValidateMode: 'onChange',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add card</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[375px] max-w-[300px] rounded'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>New card</DialogTitle>
              <DialogDescription>
                Add a new card for this user. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='number'
                render={(field) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-right'>Number</FormLabel>
                      <FormControl>
                        <Input
                          className='col-span-3'
                          {...field}
                          maxLength={16}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='cvv'
                render={(field) => {
                  return (
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
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
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

                <Button type='submit'>Save card</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

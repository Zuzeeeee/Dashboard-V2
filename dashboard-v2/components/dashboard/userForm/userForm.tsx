'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useHookFormMask } from 'use-mask-input';
import { withMask } from 'use-mask-input';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCep } from '@/app/utils/utils';
import React from 'react';
import { User } from '@/app/types';

const getAge = (dateString: Date) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(3, 'Name must be at least 3 characters long'),
  surname: z.string({ required_error: 'Surname is required.' }),
  email: z.string().email('Not a valid email'),
  birthDate: z
    .date({
      required_error: 'A date of birth is required.',
    })
    .refine((birthDate) => getAge(birthDate) < 18, {
      message: 'The user must have at least 18 years.',
    }),
  phone: z.string(),
  cep: z
    .string({ required_error: 'Cep is required.' })
    .min(8, 'Cep must have 8 numbers.'),
});

interface UserFormProps {
  defaultValues?: Partial<User>;
}

export const UserForm = ({ defaultValues }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? { ...defaultValues }
      : {
          name: '',
          surname: '',
          email: '',
          birthDate: undefined,
          phone: '',
          cep: '',
        },
    reValidateMode: 'onChange',
  });

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error: errorCep,
    status,
    refetch,
  } = useQuery({
    queryKey: ['cep', form.watch('cep')],
    queryFn: getCep,
    enabled: false,
  });

  if (isError && !isLoading && !isFetching) {
  }

  React.useEffect(() => {
    if (isError || data?.erro) {
      form.setError('cep', { type: 'validate', message: 'Cep was not found.' });
      return;
    }
    if (data) form.clearErrors('cep');
  }, [isError, data]);

  const registerWithMask = useHookFormMask(form.register);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let data = { ...values };
    data.phone = data.phone.replace(/\D/g, '');
    console.log(data);
  }

  console.log(data?.erro);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex gap-4 justify-center w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder='Surname' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-4 justify-center '>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col  w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is the contact email of the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Date of birth</FormLabel>
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
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-4 justify-center '>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='phone'
                    {...field}
                    {...registerWithMask('phone', '(99) 99999-9999')}
                  />
                </FormControl>
                <FormDescription>
                  This is phone number for contact of the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cep'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Cep</FormLabel>
                <FormControl>
                  <div className='flex'>
                    <Input
                      placeholder='cep'
                      {...field}
                      maxLength={8}
                      className='mr-2'
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        refetch();
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  This is phone number for contact of the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

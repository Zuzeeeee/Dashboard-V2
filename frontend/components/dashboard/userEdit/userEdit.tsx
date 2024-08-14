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
import { Calendar, CalendarComponent } from '@/components/ui/calendar';
import { useHookFormMask } from 'use-mask-input';
import { withMask } from 'use-mask-input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCard,
  getCep,
  saveUser,
  updateUser,
  UserFields,
} from '@/app/utils/utils';
import React from 'react';
import { Card, User } from '@/app/types';
import Link from 'next/link';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/app/user/[id]/data';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';

const getAge = (dateString: string) => {
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
    .string({
      required_error: 'A date of birth is required.',
    })
    .refine((birthDate) => getAge(birthDate) > 18, {
      message: 'The user must have at least 18 years.',
    }),
  phone: z.string(),
  cep: z
    .string({ required_error: 'Cep is required.' })
    .min(8, 'Cep must have 8 numbers.'),
  street: z.string(),
  province: z.string(),
  city: z.string(),
});

interface UserFormProps {
  defaultValues?: Partial<User>;
  dataCard?: Card[];
}

export const UserEdit = ({ defaultValues, dataCard }: UserFormProps) => {
  const { toast } = useToast();
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? { ...defaultValues }
      : {
          id: '',
          name: '',
          surname: '',
          email: '',
          birthDate: '',
          phone: '',
          cep: '',
          street: '',
          province: '',
          city: '',
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

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data && data.errors) {
        (Object.keys(data.errors) as UserFields[]).map((value) => {
          form.setError(value, { type: 'api', message: data.errors[value][0] });
        });
        return;
      }
      toast({ title: 'User updated successfully.' });
    },
  });

  React.useEffect(() => {
    if (isLoading) {
      form.setValue('street', 'Loading...');
      form.setValue('city', 'Loading...');
      form.setValue('province', 'Loading...');
      return;
    }
    if (isError || data?.erro) {
      form.setError('cep', { type: 'validate', message: 'Cep was not found.' });
      form.setValue('street', '');
      form.setValue('city', '');
      form.setValue('province', '');
      return;
    }
    if (data) {
      form.clearErrors('cep');
      form.setValue('street', data['logradouro']);
      form.setValue('city', data['localidade']);
      form.setValue('province', data['uf']);
    }
  }, [isError, data]);

  const registerWithMask = useHookFormMask(form.register);

  function onSubmit(values: z.infer<typeof formSchema>) {
    let data = { id: params['id'][0], ...values };
    data.phone = data.phone.replace(/\D/g, '');
    mutate(data);
  }

  return (
    <Form key={1} {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='gap-4 flex flex-col w-full justify-center'
      >
        <div className='gap-4 flex flex-wrap justify-center'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder='Surname' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
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
                    <CalendarComponent
                      mode='single'
                      selected={new Date(field.value)}
                      onSelect={(e) => field.onChange(e?.toDateString())}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Phone'
                    {...field}
                    {...registerWithMask('phone', '(99) 99999-9999')}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cep'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Cep</FormLabel>
                <FormControl>
                  <div className='flex'>
                    <Input
                      placeholder='Cep'
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

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder='Street' disabled {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='City' disabled {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='province'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full md:w-[40%]'>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input placeholder='Province' disabled {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {dataCard && (
          <div className='gap-4 flex flex-wrap justify-center'>
            <DataTable columns={columns} data={dataCard}></DataTable>
          </div>
        )}

        <div className='gap-2 flex w-full justify-center'>
          <Link href='/dashboard'>
            <Button variant='secondary'>Back</Button>
          </Link>

          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

'use client';

import { Button } from '@shared/shadcn-ui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/shadcn-ui/ui/card';
import { Checkbox } from '@shared/shadcn-ui/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@shared/shadcn-ui/ui/field';
import { Input } from '@shared/shadcn-ui/ui/input';
import { LoadingSwap } from '@shared/shadcn-ui/ui/loading-swap';
import Link from 'next/link';
import type { FC } from 'react';
import { Controller } from 'react-hook-form';

import useCreateRoomForm from '@features/room/hooks/useCreateRoomForm';

const NewRoomPage: FC = () => {
  const { form, onSubmit } = useCreateRoomForm();

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='mx-auto w-full max-w-lg'>
        <CardHeader>
          <CardTitle>New Room</CardTitle>
          <CardDescription>Create a new chat room</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Room Name</FieldLabel>
                    <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name='isPublic'
                control={form.control}
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field orientation='horizontal' data-invalid={fieldState.invalid}>
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                      className='cursor-pointer'
                    />
                    <FieldContent>
                      <FieldLabel className='cursor-pointer font-normal' htmlFor={field.name}>
                        Public Room
                      </FieldLabel>
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />
              <Field orientation='horizontal' className='w-full'>
                <Button type='submit' className='grow' disabled={form.formState.isSubmitting}>
                  <LoadingSwap isLoading={form.formState.isSubmitting}>Create Room</LoadingSwap>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/'>Cancel</Link>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewRoomPage;

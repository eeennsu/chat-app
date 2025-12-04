'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@shared/shadcn-ui/ui/field';
import { LoadingSwap } from '@shared/shadcn-ui/ui/loading-swap';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Button } from '@shadcn-ui/ui/button';
import { Dialog, DialogContent } from '@shadcn-ui/ui/dialog';
import { Input } from '@shadcn-ui/ui/input';

import useInviteUserForm from '@features/room/hooks/useInviteUserForm';

interface IParams {
  roomId: string;
}

const InviteUserModal: FC<IParams> = ({ roomId }) => {
  const { form, onSubmit, isOpen, setIsOpen, closeModal } = useInviteUserForm({ roomId });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-md'>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name='userId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='user-id'>User ID</FieldLabel>
                  <Input {...field} id='user-id' aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Field orientation='horizontal' className='w-full'>
              <Button type='submit' disabled={form.formState.isSubmitting} className='grow'>
                <LoadingSwap isLoading={form.formState.isSubmitting}>Invite User</LoadingSwap>
              </Button>
              <Button variant='outline' type='button' onClick={closeModal}>
                Close
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;

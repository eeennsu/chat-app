'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@shared/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { InviteUserFormSchemaDto } from '@entities/room/contracts';
import { InviteUserFormSchema } from '@entities/room/types';

import actAddUserToRoom from '../actions/addUserToRoom';

interface IParams {
  roomId: string;
}

const useInviteUserForm = ({ roomId }: IParams) => {
  const { isOpen, setIsOpen, closeModal } = useModal();
  const router = useRouter();

  const form = useForm<InviteUserFormSchema>({
    resolver: zodResolver(InviteUserFormSchemaDto),
    defaultValues: {
      userId: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: InviteUserFormSchema) => {
    const res = await actAddUserToRoom({ roomId, userId: data.userId });

    if (res.error) {
      toast.error(res.message);
    } else {
      closeModal();
      router.refresh();
    }
  });

  return { form, onSubmit, isOpen, setIsOpen, closeModal };
};

export default useInviteUserForm;

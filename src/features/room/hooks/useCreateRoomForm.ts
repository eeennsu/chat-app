import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ROOM_TOAST_MESSAGES } from '@entities/room/consts';
import { RoomFormSchemaDto } from '@entities/room/contracts';
import { RoomFormSchema } from '@entities/room/types';

import actionCreateRoom from '../actions/create';

const useCreateRoomForm = () => {
  const form = useForm<RoomFormSchema>({
    resolver: zodResolver(RoomFormSchemaDto),
    defaultValues: {
      name: '',
      isPublic: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data: RoomFormSchema) => {
    const { error, message } = await actionCreateRoom(data);

    if (error) {
      toast.error(ROOM_TOAST_MESSAGES.CREATE_FAILED, { description: message });
    } else {
      toast.success(ROOM_TOAST_MESSAGES.CREATE_SUCCESS);
    }
  });

  return { form, onSubmit };
};

export default useCreateRoomForm;

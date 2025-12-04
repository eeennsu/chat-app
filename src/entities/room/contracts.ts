import z from 'zod';

export const RoomFormSchemaDto = z.object({
  name: z.string().min(1).max(100).trim(),
  isPublic: z.boolean(),
});

export const InviteUserFormSchemaDto = z.object({
  userId: z.string().min(1).trim(),
});

import z from 'zod';

import { RoomFormSchemaDto } from './contracts';

export type RoomFormSchema = z.infer<typeof RoomFormSchemaDto>;

export interface IRoom {
  id: string;
  name: string;
  memberCount: number;
}

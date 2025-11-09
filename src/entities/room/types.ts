import z from 'zod';

import { RoomFormSchemaDto } from './contracts';

export type RoomFormSchema = z.infer<typeof RoomFormSchemaDto>;

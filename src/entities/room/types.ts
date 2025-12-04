import { StatusType } from '@shared/typings/commons';
import z from 'zod';

import { InviteUserFormSchemaDto, RoomFormSchemaDto } from './contracts';

export type RoomFormSchema = z.infer<typeof RoomFormSchemaDto>;

export interface IRoomCard extends IRoom {
  memberCount: number;
}

export interface IRoom {
  id: string;
  name: string;
}
export interface IRoomUser {
  id: string;
  name: string;
  image_url: string | null;
}

export interface IMessage {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  author: {
    name: string;
    image_url: string | null;
  };
}

export interface ISentMessage extends IMessage {
  status?: StatusType;
}

export type InviteUserFormSchema = z.infer<typeof InviteUserFormSchemaDto>;

'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@shared/shadcn-ui/ui/input-group';
import { SendIcon } from 'lucide-react';
import { FC, FormEvent, KeyboardEvent, useState } from 'react';
import { toast } from 'sonner';

import actSendMessage from '@features/room/actions/sendMessage';

import { IMessage } from '@entities/room/types';

interface IParams {
  roomId: string;
  onSendMessage: (message: Pick<IMessage, 'id' | 'text'>) => void;
  onSuccessfulSend: (id: string) => void;
  onErrorSend: (id: string) => void;
}

const ChatInput: FC<IParams> = ({ roomId, onSendMessage, onSuccessfulSend, onErrorSend }) => {
  const [message, setMessage] = useState<string>('');

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message?.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const messageId = crypto.randomUUID();
    const result = await actSendMessage({ id: messageId, roomId, text: trimmedMessage });
    onSendMessage({ id: messageId, text: trimmedMessage });

    if (result?.error) {
      toast.error(result.message);
      onErrorSend(messageId);
    } else {
      onSuccessfulSend(messageId);
    }

    setMessage('');
  };

  return (
    <form className='p-3'>
      <InputGroup>
        <InputGroupTextarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder='Type a message...'
          className='field-sizing-content min-h-auto'
          onKeyDown={onKeyDown}
        />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            type='submit'
            aria-label='Send'
            title='Send'
            size='icon-sm'
            disabled={!message?.trim()}
          >
            <span className='sr-only'>Send</span>
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default ChatInput;

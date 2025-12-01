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

interface IParams {
  roomId: string;
}

const ChatInput: FC<IParams> = ({ roomId }) => {
  const [message, setMessage] = useState<string>('');

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message?.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!message?.trim()) return;

    const result = await actSendMessage({ roomId, text: message });

    if (result?.error) {
      toast.error(result.error);
    } else {
      setMessage('');
    }
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
          <InputGroupButton type='submit' aria-label='Send' title='Send' size='icon-sm'>
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default ChatInput;

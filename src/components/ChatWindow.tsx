import React, { useEffect } from 'react';
import supabase from '../supabase';
import MessageBubble from './MessageBubble';
import { IMessage } from '../typings';

const ChatWindow: React.FC<{
  roomId: string | null;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}> = ({ roomId, messages, setMessages }) => {
  useEffect(() => {
    const channel = supabase
      .channel('supabase_relatime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `from_room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as IMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setMessages, roomId]);

  return (
    <div className=' flex-1 rounded-lg w-full'>
      <div className='  h-full overflow-y-scroll  flex flex-col space-y-3  justify-end py-3  px-3'>
        {messages?.map((msg) => (
          <MessageBubble message={msg} key={msg.id} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;

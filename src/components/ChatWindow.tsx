import React, { useEffect, useRef } from 'react';
import supabase from '../supabase';
import MessageBubble from './MessageBubble';
import { IMessage } from '../typings';

const ChatWindow: React.FC<{
  roomId: string | null;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}> = ({ roomId, messages, setMessages }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='overflow-y-scroll flex-1  flex-col rounded-lg w-full pb-16 '>
      <div className='    flex flex-col space-y-3   justify-end py-3  px-3 '>
        {messages?.map((msg) => (
          <MessageBubble message={msg} key={msg.id} />
        ))}
      </div>
      <div ref={scrollContainerRef}></div>
    </div>
  );
};

export default ChatWindow;

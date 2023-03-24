import React, { useEffect, useRef, useState } from 'react';
import supabase from '../supabase';
import { IMessage } from '../typings';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
import ChatHeader from './ChatHeader';

const Room: React.FC<{
  roomId: string | null;
}> = ({ roomId }) => {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getRoomMessages = async () => {
      const { data: roomMessages, error } = await supabase
        .from('messages')
        .select()
        .eq('from_room_id', roomId)
        .order('created_at', { ascending: true });

      setMessages(roomMessages as IMessage[]);
    };

    getRoomMessages();
  }, [roomId, supabase, setMessages]);

  const addNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {} = await supabase.from('messages').insert<Partial<IMessage>>({
      content: chatInputRef.current?.value,
      author: localStorage.getItem('user')!,
      from_room_id: roomId!,
    });
  };

  return (
    <div className='flex-[6] h-screen'>
      <div className='flex flex-col h-full  relative'>
        <ChatWindow
          roomId={roomId}
          messages={messages}
          setMessages={setMessages}
        />
        <ChatInput ref={chatInputRef} addNewMessage={addNewMessage} />
      </div>
    </div>
  );
};

export default Room;

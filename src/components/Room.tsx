import React, { useEffect, useRef, useState } from 'react';
import supabase from '../supabase';
import { IMessage } from '../typings';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';

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

  const addNewMessage = async () => {
    const {} = await supabase.from('messages').insert({
      content: chatInputRef.current?.value,
      author: localStorage.getItem('user'),
      from_room_id: roomId,
    });
  };

  return (
    <div className='flex-[6]'>
      <div className='flex flex-col h-full'>
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

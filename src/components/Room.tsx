import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
import { IMessage } from '../typings';
import supabase from '../supabase';

const Room: React.FC<{
  roomId: string | null;
}> = ({ roomId }) => {
  const chatInputRef = useRef<HTMLInputElement>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getRoomMessages = async () => {
      const { data: roomMessages, error } = await supabase
        .from('messages')
        .select()
        .eq('from_room_id', roomId)
        .order('created_at', { ascending: true });

      console.log(error);

      setMessages(roomMessages as IMessage[]);
    };

    getRoomMessages();
  }, []);

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

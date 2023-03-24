import React from 'react';
import { IMessage } from '../typings';
import formatRelative from 'date-fns/formatRelative';

const MessageBubble: React.FC<{ message: IMessage }> = ({ message }) => {
  const byCurrUser = localStorage.getItem('user') === message.author;
  return (
    <div
      className={`bg-[#015c4b] rounded-lg shadow px-3 py-1 text-white flex max-w-[80%] min-w-[20%]  flex-col ${
        byCurrUser ? 'self-end' : 'self-start !bg-[#3e4a50]'
      }`}
    >
      <div className='flex items-center justify-between'>
        <p className='text-lg'>{message.content}</p>
        <div className='w-10'></div>
        <p className='text-xs hover:underline cursor-pointer'>
          {message.author}
        </p>
      </div>
      <p className='text-sm self-end text-gray-300 font-thin'>
        {formatRelative(new Date(message.created_at), new Date())}
      </p>
    </div>
  );
};

export default MessageBubble;

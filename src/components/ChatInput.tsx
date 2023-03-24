import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import supabase from '../supabase';

const ChatInput = React.forwardRef(
  ({ addNewMessage }: { addNewMessage: () => Promise<void> }, ref) => {
    return (
      <div className='w-full relative border rounded-lg self-end'>
        <input
          type='text'
          // @ts-ignore
          ref={ref}
          className='w-full px-4 py-2 rounded-lg focus:outline-none focus:border-none text-black'
          placeholder='Enter the message.....'
        />
        <button
          //@ts-ignore
          onClick={addNewMessage}
          className='absolute right-2 top-1.5 text-gray-700 focus:text-green-500 focus:outline-none disabled:cursor-not-allowed'
        >
          <PaperAirplaneIcon className='w-7 h-7' />
        </button>
      </div>
    );
  }
);

export default ChatInput;

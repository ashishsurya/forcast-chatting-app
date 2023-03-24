import { useRef, useState } from 'react';
import supabase from '../supabase';
import { IRoom } from '../typings';

const NewRoomInput = () => {
  const inputref = useRef<HTMLInputElement>(null);

  const createNewRoom = async (roomName: string) => {
    if (roomName === '') {
      return;
    }

    const {} = await supabase
      .from('rooms')
      .insert<Partial<IRoom>>({ title: roomName });
  };

  return (
    <input
      ref={inputref}
      type='text'
      placeholder='Enter new room name'
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // make an api call
          createNewRoom(inputref.current?.value!);
        }
      }}
      className='bg-transparent p-2 focus:outline-none focus:border rounded-lg focus:shadow-lg focus:border-white'
    />
  );
};

export default NewRoomInput;

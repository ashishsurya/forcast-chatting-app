import { useRef, useState } from 'react';
import supabase from '../supabase';
import { IRoom } from '../typings';

const NewRoomInput: React.FC<{
  setShowNewRoomCreateInput: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowNewRoomCreateInput }) => {
  const inputref = useRef<HTMLInputElement>(null);

  const createNewRoom = async (roomName: string) => {
    if (roomName === '') {
      return;
    }

    const { error } = await supabase
      .from('rooms')
      .insert<Partial<IRoom>>({ title: roomName });

    if (!error) {
      setShowNewRoomCreateInput(false);
    }
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

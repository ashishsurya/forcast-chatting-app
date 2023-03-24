import { PlusIcon } from '@heroicons/react/24/solid';
import { IRoom } from '../typings';
import SidebarRoomCard from './SidebarRoomCard';
import { useEffect, useState } from 'react';
import NewRoomInput from './NewRoomInput';
import supabase from '../supabase';

const SideBar: React.FC<{
  rooms: IRoom[];
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  setRooms: React.Dispatch<React.SetStateAction<IRoom[]>>;

  selectedRoomId: string | null;
}> = ({ rooms, setSelectedRoomId, selectedRoomId, setRooms }) => {
  const username = localStorage.getItem('user');
  const [showNewRoomCreateInput, setShowNewRoomCreateInput] =
    useState<boolean>(false);

  return (
    <div className='py-9 flex-[2] bg-[#111b21] h-full flex items-center flex-col space-y-4'>
      <h3 className='font-bold'>
        👋 Welcome ,{' '}
        <span className='text-lg font-normal tracking-tighter underline'>
          {username}
        </span>
      </h3>
      {rooms.map((room) => (
        <SidebarRoomCard
          key={room.id}
          room={room}
          handleSidebarRoomCardClick={() => setSelectedRoomId(room.id)}
          selectedRoomId={selectedRoomId}
        />
      ))}
      {showNewRoomCreateInput && <NewRoomInput />}
      <button
        className='flex items-center bg-gray-900'
        onClick={() => {
          setShowNewRoomCreateInput(true);
        }}
      >
        <p>Create new room</p>
        <span>
          <PlusIcon className='w-6 h-6' />
        </span>
      </button>
    </div>
  );
};

export default SideBar;

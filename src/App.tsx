import { useEffect, useState } from 'react';
import Room from './components/Room';
import SideBar from './components/SideBar';
import { IRoom } from './typings';
import supabase from './supabase';
import { generateUsername } from 'unique-username-generator';

const App: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      const currUsername = generateUsername();
      localStorage.setItem('user', currUsername);
    }

    const getRooms = async () => {
      const { data: rooms } = await supabase.from('rooms').select();
      setRooms(rooms as IRoom[]);
    };

    getRooms();
  }, []);

  return (
    <div className='flex flex-row h-screen'>
      <SideBar
        rooms={rooms}
        setSelectedRoomId={setSelectedRoomId}
        selectedRoomId={selectedRoomId}
      />

      {selectedRoomId === null ? (
        <div className='flex-[6]'>
          <div className='flex items-center justify-center h-full'>
            <h2 className='text-7xl tracking-tighter'>
              Click on any of the rooms
            </h2>
          </div>
        </div>
      ) : (
        <Room roomId={selectedRoomId} />
      )}
    </div>
  );
};

export default App;

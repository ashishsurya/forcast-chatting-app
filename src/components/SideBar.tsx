import { IRoom } from '../typings';
import SidebarRoomCard from './SidebarRoomCard';

const SideBar: React.FC<{
  rooms: IRoom[];
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRoomId: string | null;
}> = ({ rooms, setSelectedRoomId, selectedRoomId }) => {
  const username = localStorage.getItem('user');
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
      
    </div>
  );
};

export default SideBar;

import { IRoom } from '../typings';

const SidebarRoomCard: React.FC<{
  room: IRoom;
  handleSidebarRoomCardClick: () => void;
  selectedRoomId: string | null;
}> = ({ room, handleSidebarRoomCardClick, selectedRoomId }) => {
  const isCurrRoomSelected = selectedRoomId === room.id;
  return (
    <div
      aria-label={`room - ${room.id} - ${room.title}`}
      onClick={handleSidebarRoomCardClick}
      className={`${
        isCurrRoomSelected ? 'bg-[#04a784]' : 'bg-[#212e35]'
      } p-2 cursor-pointer shadow-lg rounded-lg`}
    >
      <p>{room.title}</p>
    </div>
  );
};

export default SidebarRoomCard;

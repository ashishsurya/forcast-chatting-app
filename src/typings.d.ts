export interface IMessage  {
  id: string;
  created_at: string;
  content: string;
  from_room_id: string;
  author:string
};

export interface IRoom  {
  id: string;
  created_at: string;
  title: string;
};

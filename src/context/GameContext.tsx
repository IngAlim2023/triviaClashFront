import { createContext } from "react";

export type DataUsers = {
    name:string
}
export type DataRooms = {
    code:string
}

interface Context {
  name: string;
  setName: (name: string) => void;
  users: DataUsers[];
  setUsers: (users:DataUsers[])=> void;
  rooms:DataRooms[];
  setRooms:(rooms:DataRooms[]) => void;
}


export const GameContext = createContext<Context|undefined>(undefined)
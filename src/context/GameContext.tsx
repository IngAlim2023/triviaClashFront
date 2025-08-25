import { createContext } from "react";

export type DataUsers = {
    name:string
}

interface Context {
  name: string;
  setName: (name: string) => void;
  users: DataUsers[];
  setUsers: (users:DataUsers[])=> void
}


export const GameContext = createContext<Context|undefined>(undefined)
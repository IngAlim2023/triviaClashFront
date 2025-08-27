import { createContext } from "react";

export type DataUsers = { name: string };
export type DataRooms = { code: string };

// mismos valores que el enum del back
export type Avatar =
  | "gryphon"
  | "chimera"
  | "echidna"
  | "madreMonte"
  | "scarecrow"
  | "summoner"
  | "dragon2"
  | "Basilisk"
  | "bat";

interface Context {
  name: string;
  setName: (name: string) => void;

  avatar: Avatar;
  setAvatar: (a: Avatar) => void;

  users: DataUsers[];
  setUsers: (users: DataUsers[]) => void;

  rooms: DataRooms[];
  setRooms: (rooms: DataRooms[]) => void;
}

export const GameContext = createContext<Context | undefined>(undefined);

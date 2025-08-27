import { useState, type ReactNode } from "react";
import {
  GameContext,
  type DataRooms,
  type DataUsers,
  type Avatar,
} from "./GameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<Avatar>("bat"); // default
  const [users, setUsers] = useState<DataUsers[]>([]);
  const [rooms, setRooms] = useState<DataRooms[]>([]);

  return (
    <GameContext.Provider
      value={{
        name,
        setName,
        avatar,
        setAvatar,
        users,
        setUsers,
        rooms,
        setRooms,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

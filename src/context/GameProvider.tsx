import { useState, type ReactNode } from "react";
import { GameContext, type DataRooms, type DataUsers } from "./GameContext";


export const GameProvider = ({children}:{children:ReactNode}) =>{
    const [name, setName] = useState<string>('')
    const [users, setUsers] = useState<DataUsers[]>([])
    const [rooms, setRooms] = useState<DataRooms[]>([])
    return <GameContext.Provider value={{
        name,
        setName,
        users,
        setUsers,
        rooms,
        setRooms
    }}>
        {children}
    </GameContext.Provider>
}
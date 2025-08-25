import { useState, type ReactNode } from "react";
import { GameContext, type DataUsers } from "./GameContext";


export const GameProvider = ({children}:{children:ReactNode}) =>{
    const [name, setName] = useState<string>('')
    const [users, setUsers] = useState<DataUsers[]>([])
    return <GameContext.Provider value={{
        name,
        setName,
        users,
        setUsers
    }}>
        {children}
    </GameContext.Provider>
}
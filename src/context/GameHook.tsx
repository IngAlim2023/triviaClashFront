import { useContext } from "react";
import { GameContext } from "./GameContext";

const useGameContext= () =>{
    const context = useContext(GameContext);
    if(!context)  {
       throw new Error('Debes utilizar el contexto dentro del provider')
    }
    return context

} 


export default useGameContext
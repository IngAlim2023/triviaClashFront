import React from "react";
import Narwhal from "../../assets/Narwhal.png";
import { useForm, type SubmitHandler } from "react-hook-form";
import socket from "../../services/socket";
import useGameContext from "../../context/GameHook";

interface Modales{
    playerModal: boolean,
    setPlayerModal: (playerModal: boolean)=> void,
}

interface Inputs{
    sala:string;
    salaRequired:string;
    nombre:string;
}

const Players: React.FC<Modales> = ({playerModal, setPlayerModal}) => {

    const {setName} = useGameContext();

    const {register, handleSubmit} = useForm<Inputs>()

    const onSubmit:SubmitHandler<Inputs> = async (data) =>{
      //Aquí vamos a registrar un usuario:  
      socket.emit("newUser", data.nombre);
      setName(data.nombre)
    }
  return (
    <div className="flex w-screen min-h-screen bg-background/60 justify-center items-center fixed inset-0">
      <div className="flex flex-col bg-white p-6 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-center items-center gap-4">
          <img src={Narwhal} alt="Narwhal" className="w-20 flex-initial" />
          <h1 className="font-(family-name:--font-jersey-25) text-primary text-2xl">
            Jugador
          </h1>
        </div>
        <div className="bg-white p-6 rounded-2xl w-full max-w-sm md:max-w-md">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="cod_sal"
              className="font-(family-name:--font-jersey-25)"
            >
              Cóidgo de sala
            </label>
            <input
              type="text"
              placeholder="AB12"
              className="font-(family-name:--font-jersey-25) border p-1 rounded-sm w-3/10"
              {...register("sala",{required:true})}
            />
            <label
              htmlFor="nombre"
              className="font-(family-name:--font-jersey-25)"
            >
              Código de sala
            </label>
            <input
              type="text"
              placeholder="Escoge un apodo único"
              className="font-(family-name:--font-jersey-25) border p-1 rounded-sm"
              {...register("nombre",{required:true})}
            />
            <button className="font-(family-name:--font-jersey-25) bg-btn-primary text-amber-50 rounded-sm m-2 w-2/3">
              Unirme a la sala
            </button>
          </form>
        </div>
        <div className="m-2 flex flex-row-reverse">
          <button className="font-(family-name:--font-jersey-25) rounded-xs bg-btn-secondary p-1 text-white text-sm"
          onClick={()=>setPlayerModal(!playerModal)}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Players;

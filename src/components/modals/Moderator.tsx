import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import dragon from "../../assets/dragon.png";
import toast from "react-hot-toast";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom";

interface Modal {
  setModeratorModal: (moderatorModal: boolean) => void;
}

const Moderator: React.FC<Modal> = ({ setModeratorModal }) => {
  const [codigo, setCodigo] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    const cod = nanoid(6);
    setCodigo(cod);
  }, []);

  const onSubmit = () => {
    socket.emit("newRoom", codigo);
    toast.success(() => (
      <div className="font-jersey-25">Sala Creada</div>
    ));
    navigate(`/game/${codigo}`)
  };

  return (
    <div className="flex w-screen min-h-screen bg-background/60 justify-center items-center fixed inset-0">
      <div className="flex flex-col bg-white p-6 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-center items-center gap-4">
          <img src={dragon} alt="dragon" className="w-20 flex-initial" />
          <h1 className="font-jersey-25 text-primary text-2xl">Moderador</h1>
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-2xl w-full">
          <div className="font-jersey-25 text-xl">
            ¿Quieres dirigir la partida?
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="cod_sal"
              className="font-(family-name:--font-jersey-25)"
            >
              Código de sala
            </label>
            <input
              className="font-jersey-25 border p-1 mt-2 rounded-sm w-40 text-center text-gray-800"
              type="text"
              value={codigo}
              readOnly
            />

            <button
              className="font-jersey-25 bg-btn-primary text-amber-50 mt-3 rounded-sm  w-2/3"
              onClick={() => onSubmit()}
            >
              Crear sala
            </button>
          </div>
        </div>
        <div className="m-2 flex flex-row-reverse">
          <button
            className="font-jersey-25 rounded-sm bg-btn-secondary p-1 text-white text-x px-8"
            onClick={() => setModeratorModal(false)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moderator;

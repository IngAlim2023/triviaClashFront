import React, { useState } from "react";
import AddQuestionsModal from "../components/modals/AddQuestionsModal";


const ScreenGame = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-btn-primary px-4 py-2 text-white justify-center"
      >
        Abrir modal de preguntas
      </button>

      <AddQuestionsModal
        open={open}
        roomCode="AB12"
        onClose={() => setOpen(false)}
        onSave={(qa) => console.log("Pregunta guardada:", qa)}
        onStart={(all) => console.log("Iniciar partida con:", all)}
      />
    </>
  );
};

export default ScreenGame;

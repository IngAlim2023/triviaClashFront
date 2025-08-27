import React, { useState } from "react";
import AddQuestionsModal from "../components/modals/AddQuestionsModal";
import GameStartedModal from "../components/modals/GameStartedModal";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../services/socket";
import toast from "react-hot-toast";

const ScreenGame: React.FC = () => {
  const [open, setOpen] = useState(true); // modal de crear preguntas
  const [nextOpen, setNextOpen] = useState(false); // modal "qué quieres hacer ahora"
  const { id } = useParams();
  const navigate = useNavigate();

  const handleStart = (all: any[]) => {
    socket.emit("rooms", { room: id, questions: all });
    setOpen(false);
    setNextOpen(true);

    // Notificación "Juego Iniciado"
    toast.success(() => <div className="font-jersey-25">Juego Iniciado</div>);
  };

  return (
    <>
      <AddQuestionsModal
        open={open}
        roomCode={id}
        onClose={() => navigate(-1)}
        onSave={(qa) => console.log("Pregunta guardada:", qa)}
        onStart={handleStart}
      />

      <GameStartedModal
        open={nextOpen}
        onCreateNew={() => navigate("/", { state: { openModerator: true } })}
        onPlay={() => navigate("/", { state: { openPlayer: true } })}
        onBack={() => navigate("/")}
      />
    </>
  );
};

export default ScreenGame;

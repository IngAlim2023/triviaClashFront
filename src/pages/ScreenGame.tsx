import React, { useState } from "react";
import AddQuestionsModal from "../components/modals/AddQuestionsModal";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../services/socket";


const ScreenGame:React.FC = () => {
  const [open, setOpen] = useState(true);
  const { id } = useParams()

  const navigate = useNavigate()

  return (
    <>
      <AddQuestionsModal
        open={open}
        roomCode={id}
        onClose={() => navigate(-1)}
        onSave={(qa) => console.log("Pregunta guardada:", qa)}
        onStart={(all) => {
          socket.emit('rooms', {room: id, questions:all})
        }}
      />
    </>
  );
};

export default ScreenGame;

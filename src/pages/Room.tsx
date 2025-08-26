import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";

const Room: React.FC = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<[]>([]);

  useEffect(() => {
    if (!id) return;

    socket.emit("room:getQuestions", { room: id }, (res: any) => {
      console.log(res);
      if (res.ok) {
        console.log("Preguntas de la sala:", res.questions);
        setQuestions(res.questions);
      } else {
        console.error("Error:", res.error);
      }
    });

    // opcional: escuchar actualizaciones de rooms
    socket.on("rooms", (rooms) => {
      const roomFound = rooms.find((r: any) => r.room === id);
      if (roomFound) {
        setQuestions(roomFound.questions);
      }
    });

    return () => {
      socket.off("rooms");
    };
  }, [id]);
  console.log(questions);

  return (
    <div>
      <h2>Preguntas de la sala {id}</h2>
      {questions.length === 0 ? (
        <p>No hay preguntas aún</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q, i) => (
            <li key={i} className="p-2 border rounded-md">
              <div className="flex flex-col">
                <strong>pregunta?: {q.question}</strong>
                <strong>⏱ {q.timeSec} seg</strong>
              </div>
              <div className="mt-2 space-y-1">
                {q.answers.map((ans, x) => (
                  <div key={`${i}-${x}`} className="pl-4">
                    ➤ {ans}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Room;

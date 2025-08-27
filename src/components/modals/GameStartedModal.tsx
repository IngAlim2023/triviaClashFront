import React from "react";
import Dragon from "../../assets/dragon.png";

type Props = {
  open: boolean;
  onCreateNew?: () => void;
  onPlay?: () => void; 
  onBack?: () => void; 
  title?: string;
};

const GameStartedModal: React.FC<Props> = ({
  open,
  onCreateNew,
  onPlay,
  onBack,
  title = "¿Qué quieres hacer ahora?",
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-black/5 bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <img src={Dragon} alt="dragon" className="h-14 w-14 mb-3" />
          <h2 className="font-jersey-25 text-3xl text-primary mb-6">{title}</h2>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={onCreateNew}
              className="font-jersey-25 rounded-md bg-tertiary px-5 py-2 text-white text-xl shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            >
              Crear nueva Trivia
            </button>

            <button
              onClick={onPlay}
              className="font-jersey-25 rounded-md bg-btn-primary px-5 py-2 text-amber-50 text-xl shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            >
              Jugar
            </button>

            <button
              onClick={onBack}
              className="font-jersey-25 rounded-md bg-btn-secondary px-5 py-2 text-white text-xl shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStartedModal;

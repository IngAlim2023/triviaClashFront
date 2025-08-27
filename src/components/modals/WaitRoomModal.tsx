import React from "react";
import Narwhal from "../../assets/Narwhal.png";
import { FaCopy } from "@react-icons/all-files/fa/FaCopy";
import toast from "react-hot-toast";



type Props = {
  open: boolean;
  roomName?: string;
  roomCode?: string;
};

const Dot: React.FC<{ delayMs: number }> = ({ delayMs }) => (
  <span
    className="mx-1 inline-block h-4 w-3 rounded-full bg-secondary animate-bounce"
    style={{ animationDelay: `${delayMs}ms` }}
  />
);

const WaitRoomModal: React.FC<Props> = ({
  open,
  roomName = "Sala AB12",
  roomCode = "AB12",
}) => {
  if (!open) return null;

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(roomCode ?? "");
    toast.success(() => (
      <div className="font-jersey-25 w-25">
        Código copiado
        <div className="text-xs opacity-80">{roomCode}</div>
      </div>
    ));
  } catch {
    toast.error("No se pudo copiar el código");
  }
};


  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={Narwhal} alt="Narwhal" className="h-12 w-12" />
            <h2 className="font-(family-name:--font-jersey-25) text-2xl leading-none text-primary">
              {roomName}
            </h2>
          </div>

          <button
            onClick={copyCode}
            className="flex items-center gap-2 rounded-lg bg-btn-secondary/90 px-3 py-1.5 text-sm text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            title="Copiar código"
          >
            <span className="font-jersey-25 text-[20px] tracking-wider">
              {roomCode}
            </span>
            <FaCopy style={{ width: 25, height: 25 }} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-10 text-center">
          {/* Animación de carga con dots escalonados */}
          <div className="mb-6 flex items-center justify-center">
            <Dot delayMs={0} />
            <Dot delayMs={120} />
            <Dot delayMs={240} />
            <Dot delayMs={360} />
            <Dot delayMs={480} />
          </div>

          <p className="text-xl text-black/70 font-jersey-25">
            Esperando que el moderador inicie la partida
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitRoomModal;

import React from "react";
import Narwhal from "../../assets/Narwhal.png";

type Props = {
  open: boolean;
  roomName?: string;
  roomCode?: string; 
  onReady?: () => void;
  onClose?: () => void;
};

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      d="M9 3h6a2 2 0 0 1 2 2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2Zm0 2a2 2 0 0 0-2 2v0h10v0a2 2 0 0 0-2-2H9Z"
      className="fill-current opacity-20"
    />
    <rect x="6" y="7" width="12" height="14" rx="2" className="fill-current" />
  </svg>
);

const Dot: React.FC<{ delayMs: number }> = ({ delayMs }) => (
  <span
    className="mx-1 inline-block h-2 w-2 rounded-full bg-primary/80 animate-bounce"
    style={{ animationDelay: `${delayMs}ms` }}
  />
);

const WaitRoomModal: React.FC<Props> = ({
  open,
  roomName = "Sala AB12",
  roomCode = "AB12",
  onReady,
  onClose,
}) => {
  if (!open) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-2 text-black/50 transition hover:bg-black/5 hover:text-black/70"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

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
            <span className="font-(family-name:--font-jersey-25) tracking-wider">
              {roomCode}
            </span>
            <ClipboardIcon className="h-4 w-4" />
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

          <p className="text-sm text-black/70">
            Esperando que el moderador inicie la partida
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onReady}
            className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-primary px-5 py-2 text-amber-50 shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Estoy listo
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitRoomModal;


// Para llamar al modal
{/* <WaitRoomModal
  open={waiting}
  roomName="Sala AB12"
  roomCode="AB12"
  open={true}
  onReady={() => socket.emit("player-ready")}
  onClose={() => setWaiting(false)}
/>; */}
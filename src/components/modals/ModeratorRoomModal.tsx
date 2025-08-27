import React from "react";
import Dragon from "../../assets/Dragon.png";
import Horse from "../../assets/player-horse.png";



type Player = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

type Props = {
  open: boolean;
  roomCode: string;
  players: Player[];
  onEdit?: () => void;
  onStart?: () => void;
  onClose?: () => void;
  title?: string;
};

const ClipboardIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M9 3h6a2 2 0 0 1 2 2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2Z"
      className="fill-current opacity-20"
    />
    <rect x="6" y="7" width="12" height="14" rx="2" className="fill-current" />
  </svg>
);

const DefaultPlayerIcon = () => (
  <>
    <img src={Horse} alt="Moderador" className="h-12 w-10" />
  </>
);

const ModeratorRoomModal: React.FC<Props> = ({
  open,
  roomCode,
  players,
  onEdit,
  onStart,
  onClose,
  title = "Moderador",
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
      <div className="relative w-full max-w-2xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
        {/* Cerrar */}
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
            <img src={Dragon} alt="Moderador" className="h-24 w-24" />
            <div>
              <h3 className="font-jersey-25 text-primary leading-none text-[30px]">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={copyCode}
            className="flex items-center gap-2 rounded-lg bg-btn-secondary/90 px-3 py-1.5 text-sm text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            title="Copiar código de sala"
          >
            <span className="font-(family-name:--font-jersey-25) tracking-wider">
              {roomCode}
            </span>
            <ClipboardIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl bg-white px-2 py-2">
          <p className="mb-3 text-black/80 font-jersey-15 text-[30px]">
            Lista de jugadores
          </p>

          <ul className="space-y-2">
            {players.map((p) => (
              <li key={p.id} className="group my-5">
                <div className="flex items-center gap-2">
                  <span className="text-primary mb-1">
                    {p.icon ?? <DefaultPlayerIcon />}
                  </span>
                  <span className="font-jersey-15 text-black text-[20px]">{p.name}</span>
                </div>
                <div className="mt-1 h-px w-full bg-black/50"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onEdit}
            className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-secondary px-5 py-2 text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Editar
          </button>
          <button
            onClick={onStart}
            className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-primary px-5 py-2 text-amber-50 shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeratorRoomModal;
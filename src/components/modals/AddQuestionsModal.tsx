import React, { useState } from "react";
import Dragon from "../../assets/Dragon.png";

type QA = {
  id: string;
  question: string;
  answers: string[]; // 4 opciones
  correct: number; // índice 0..3
  timeSec: number; // 30, 45, 60...
};

type Props = {
  open: boolean;
  roomCode?: string;
  onClose?: () => void;
  onSave?: (qa: QA) => void;
  onStart?: (all: QA[]) => void;
};

const TIMES = [30, 45, 60, 90, 120];

const AddQuestionsModal: React.FC<Props> = ({
  open,
  roomCode = "AB12",
  onClose,
  onSave,
  onStart,
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [timeSec, setTimeSec] = useState<number>(30);
  const [list, setList] = useState<QA[]>([]);
  

  if (!open) return null;

  const updateAnswer = (idx: number, v: string) => {
    setAnswers((a) => a.map((x, i) => (i === idx ? v : x)));
  };

  const canSave =
    question.trim().length > 0 &&
    answers.every((a) => a.trim().length > 0) &&
    correct >= 0 &&
    correct < 4;

  const save = () => {
    if (!canSave) return;
    const qa: QA = {
      id: crypto.randomUUID(),
      question: question.trim(),
      answers: answers.map((a) => a.trim()),
      correct,
      timeSec,
    };
    setList((L) => [...L, qa]);
    onSave?.(qa);
    // limpiar formulario
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrect(0);
    setTimeSec(30);
  };
//   console.log(rooms);
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={Dragon} className="h-12 w-12" alt="Dragón" />
            <h2 className="font-jersey-25 text-3xl text-primary">
              Añade tus preguntas
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-btn-secondary/90 px-3 py-1.5 text-sm text-white">
              {roomCode}
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-full p-2 text-black/50 hover:bg-black/5"
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
          </div>
        </div>

        {/* Body: izquierda formulario / derecha lista */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
          {/* Formulario */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-black/70">
              Añadir pregunta
            </label>
            <input
              className="mb-4 w-full rounded-md border border-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30"
              placeholder="Ingresa tu pregunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <div className="mb-1 text-xs font-semibold text-primary/80">
              Selecciona la respuesta correcta
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {answers.map((ans, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Checkbox custom cuadrado */}
                  <button
                    type="button"
                    aria-pressed={correct === i}
                    onClick={() => setCorrect(i)}
                    className={[
                      "grid h-6 w-6 place-items-center rounded-sm border-2",
                      correct === i
                        ? "border-emerald-600 bg-emerald-400"
                        : "border-black/40 bg-white hover:bg-black/5",
                    ].join(" ")}
                    title="Marcar como correcta"
                  >
                    {correct === i && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>

                  <input
                    className="flex-1 rounded-md border border-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30"
                    placeholder="Ingresa tu respuesta"
                    value={ans}
                    onChange={(e) => updateAnswer(i, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Tiempo */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-black/80">
                Selecciona el tiempo de tu partida
              </label>
              <div className="inline-flex items-center gap-2">
                <select
                  className="rounded-md border border-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30"
                  value={timeSec}
                  onChange={(e) => setTimeSec(Number(e.target.value))}
                >
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t} segundos
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lista lateral */}
          <aside className="rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-black/80">Preguntas</h4>
              <button
                onClick={save}
                disabled={!canSave}
                className={[
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white",
                  canSave
                    ? "bg-btn-secondary hover:brightness-105"
                    : "bg-btn-secondary/50 cursor-not-allowed",
                ].join(" ")}
              >
                <span className="text-lg leading-none">＋</span> Nueva pregunta
              </button>
            </div>

            <ul className="space-y-2">
              {list.map((q) => (
                <li
                  key={q.id}
                  className="flex items-start justify-between gap-2 rounded-md bg-black/[0.03] px-3 py-2"
                >
                  <span className="line-clamp-1 text-sm text-black/80">
                    {q.question}
                  </span>
                  <button
                    className="rounded p-1 text-black/50 hover:bg-black/10"
                    title="Editar (placeholder)"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </li>
              ))}
              {list.length === 0 && (
                <li className="rounded-md bg-black/[0.03] px-3 py-6 text-center text-xs text-black/50">
                  Aún no has agregado preguntas.
                </li>
              )}
            </ul>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-lg bg-btn-secondary px-5 py-2 text-sm text-white hover:brightness-105"
          >
            Volver
          </button>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={!canSave}
              className={[
                "rounded-lg px-5 py-2 text-sm text-white",
                canSave
                  ? "bg-rose-400 hover:brightness-105"
                  : "bg-rose-300/60 cursor-not-allowed",
              ].join(" ")}
            >
              Guardar pregunta
            </button>
            <button
              onClick={() => onStart?.(list)}
              className="rounded-lg bg-btn-primary px-5 py-2 text-sm text-amber-50 hover:brightness-105"
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionsModal;

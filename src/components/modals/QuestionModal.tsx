import React, { useEffect, useMemo, useState } from "react";

type Option = { id: string; label: string };

type Props = {
  open: boolean;


  heading?: string;
  headingSub?: string; 
  question: string;


  options: Option[];
  initialSelectedId?: string | null;


  onPrev?: () => void;
  onNext?: (selectedId: string | null) => void;

  timerSec?: number;
  onTimeout?: () => void;


  nextLabel?: string;
  prevLabel?: string;
};

const QuestionModal: React.FC<Props> = ({
  open,
  heading = "Responde todas las preguntas",
  headingSub = "que puedas",
  question,
  options,
  initialSelectedId = null,
  onPrev,
  onNext,
  timerSec,
  onTimeout,
  nextLabel = "Siguiente",
  prevLabel = "Anterior",
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId
  );
  const [timeLeft, setTimeLeft] = useState<number | null>(
    typeof timerSec === "number" ? timerSec : null
  );

  useEffect(() => {
    if (!open || typeof timerSec !== "number") return;
    setTimeLeft(timerSec);
  }, [open, timerSec]);

  useEffect(() => {
    if (!open || timeLeft === null) return;
    if (timeLeft <= 0) {
      onTimeout?.();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => (t ?? 1) - 1), 1000);
    return () => clearInterval(id);
  }, [open, timeLeft, onTimeout]);

  const gridOptions = useMemo(() => {

    return options.slice(0, 4);
  }, [options]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl">

        {typeof timeLeft === "number" && (
          <div className="absolute right-4 top-4 select-none rounded-xl bg-black/[0.04] px-3 py-2 text-center leading-tight">
            <div className="text-lg font-semibold text-black/80">
              {timeLeft}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-black/50">
              seg
            </div>
          </div>
        )}

        <header className="mb-6">
          <h2 className="text-2xl font-jersey-25 tracking-tight text-black/100">
            <span className="block">{heading}</span>
            {headingSub && (
              <span className="block text-black/40">{headingSub}</span>
            )}
          </h2>
        </header>


        <h3 className="mb-6 text-center font-(family-name:--font-jersey-25) text-2xl text-black">
          {question}
        </h3>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {gridOptions.map((opt) => {
            const selected = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedId(opt.id)}
                className={[
                  "h-14 w-full rounded-xl border-2 px-4 text-sm font-semibold transition",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  selected
                    ? "border-emerald-500 bg-emerald-300/80 text-black focus:ring-emerald-500"
                    : "border-black/30 bg-white text-black hover:bg-black/[0.03] focus:ring-black/30",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>


        <div className="mt-8 flex items-center justify-end gap-3">
          {onPrev && (
            <button
              onClick={onPrev}
              className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-secondary px-5 py-2 text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            >
              {prevLabel}
            </button>
          )}
          <button
            onClick={() => onNext?.(selectedId)}
            disabled={!selectedId}
            className={[
              "font-(family-name:--font-jersey-25) rounded-lg px-5 py-2 text-amber-50 shadow-sm transition active:scale-[0.98]",
              selectedId
                ? "bg-btn-primary hover:brightness-105"
                : "bg-btn-primary/50 cursor-not-allowed",
            ].join(" ")}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;


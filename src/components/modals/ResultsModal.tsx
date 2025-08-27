import React from "react";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { HiXCircle } from "@react-icons/all-files/hi/HiXCircle";

type ResultItem = {
  question: string;
  correctAnswer: string;
  userAnswer?: string | null;
};

type Props = {
  open: boolean;
  totalCorrect: number;
  totalQuestions: number;
  timeUsedSec: number;
  pointsPerCorrect?: number;
  correctItems: ResultItem[];
  wrongItems: ResultItem[];
  onBack: () => void;
  onRestart: () => void;
};

const ResultsModal: React.FC<Props> = ({
  open,
  totalCorrect,
  totalQuestions,
  timeUsedSec,
  pointsPerCorrect = 10,
  correctItems,
  wrongItems,
  onBack,
  onRestart,
}) => {
  if (!open) return null;

  const totalPoints = totalCorrect * pointsPerCorrect;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm">
      {/* Contenedor principal con altura máxima y layout en columna */}
      <div className="relative flex w-full max-w-5xl flex-col rounded-2xl border border-black/5 bg-white shadow-xl max-h-[85vh] md:max-h-[90vh]">
        {/* Puntos arriba a la derecha */}
        <div className="absolute right-6 top-6 rounded-xl bg-white px-4 py-2 text-center shadow-sm border border-black/10">
          <div className="text-2xl font-jersey-25 text-primary leading-none">
            {totalPoints}
          </div>
          <div className="text-[12px] tracking-wide text-black/50 leading-none">
            Total
          </div>
        </div>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 shrink-0">
          <h2 className="font-jersey-25 text-5xl text-title leading-none mb-3">
            Resultados
          </h2>
          {/* Resumen */}
          <div className="mb-2 text-base">
            <div className="text-black/70">
              <span className="font-semibold">Correctas:</span> {totalCorrect} /{" "}
              {totalQuestions}
            </div>
            <div className="text-black/70">
              <span className="font-semibold">Tiempo total:</span> {timeUsedSec}
              s
            </div>
          </div>
        </div>

        {/* BODY SCROLLABLE */}
        <div className="px-6 pb-4 flex-1 overflow-y-auto overscroll-contain">
          <div className="rounded-2xl  bg-white p-4 md:p-5">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Correctas */}
              <div>
                <h3 className="font-jersey-25 text-2xl md:text-3xl text-emerald-700 mb-2">
                  Correctas
                </h3>

                {correctItems.length === 0 ? (
                  <div className="text-sm text-black/60">Ninguna correcta</div>
                ) : (
                  <ul className="space-y-3 pr-1">
                    {correctItems.map((it, idx) => (
                      <li
                        key={`c-${idx}`}
                        className="rounded-lg border-2 border-emerald-200 p-3"
                      >
                        <div className="font-jersey-25 text-xl mb-1">
                          {it.question}
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm">
                          <FaCheckCircle className="h-4 w-4 text-btn-secondary" />
                          <span>{it.correctAnswer}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Incorrectas */}
              <div>
                <h3 className="font-jersey-25 text-2xl md:text-3xl text-rose-700 mb-2">
                  Incorrectas
                </h3>

                {wrongItems.length === 0 ? (
                  <div className="text-sm text-black/60">
                    Ninguna incorrecta
                  </div>
                ) : (
                  <ul className="space-y-3 pr-1">
                    {wrongItems.map((it, idx) => (
                      <li
                        key={`w-${idx}`}
                        className="rounded-lg border-2 border-rose-200 p-3"
                      >
                        <div className="font-jersey-25 text-xl mb-2">
                          {it.question}
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                          <div className="inline-flex items-center gap-2 leading-none">
                            <FaCheckCircle className="h-4 w-4 text-btn-secondary" />
                            <span>Correcta: {it.correctAnswer}</span>
                          </div>

                          {it.userAnswer != null && (
                            <div className="inline-flex items-center gap-2 leading-none">
                              <HiXCircle className="h-5 w-5 text-btn-primary" />
                              <span>Tu respuesta: {it.userAnswer}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo dentro del modal */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onBack}
            className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-secondary px-5 py-2 text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Volver
          </button>
          <button
            onClick={onRestart}
            className="font-(family-name:--font-jersey-25) rounded-lg bg-btn-primary px-5 py-2 text-amber-50 shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;

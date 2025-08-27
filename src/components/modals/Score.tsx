import React, { useEffect, useMemo, useState } from "react";
import { loadScore } from "../../services/score";

// ⬇️ Import estático de assets (como los otros)
import batImg from "../../assets/bat.png";
import chimeraImg from "../../assets/chimera.png";
import echidnaImg from "../../assets/echidna.png";
import madreMonteImg from "../../assets/madre-monte.png"; // enum: madreMonte → archivo: madre-monte.png
import scarecrowImg from "../../assets/scarecrow.png";
import summonerImg from "../../assets/summoner.png";
import dragon2Img from "../../assets/dragon-2.png"; // enum: dragon2 → archivo: dragon-2.png
import gryphonImg from "../../assets/gryphon.png";
import BasiliskImg from "../../assets/Basilisk.png"; // enum: Basilisk (con mayúscula en enum y archivo)

// Fallback por si llega un valor desconocido
import horseFallback from "../../assets/player-horse.png";

type ScoreData = {
  nombre: string;
  score: number;
  icono?: string; // valores del enum del back
};

interface Props {
  setScoreModal: (val: boolean) => void;
}

// Mapa EXACTO a los valores del enum del back
const ICONS: Record<string, string> = {
  gryphon: gryphonImg,
  chimera: chimeraImg,
  echidna: echidnaImg,
  madreMonte: madreMonteImg,
  scarecrow: scarecrowImg,
  summoner: summonerImg,
  dragon2: dragon2Img,
  Basilisk: BasiliskImg,
  bat: batImg,
};

const getIconSrc = (name?: string) => {
  if (!name) return horseFallback;
  // match exacto del enum; si no existe, usa fallback
  return ICONS[name] ?? horseFallback;
};

const Score: React.FC<Props> = ({ setScoreModal }) => {
  const [data, setData] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await loadScore();
        // soporta { data: [...] } o [...]
        const rows: ScoreData[] = Array.isArray(res) ? res : res?.data ?? [];
        setData(rows);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sorted = useMemo(
    () => [...data].sort((a, b) => b.score - a.score),
    [data]
  );

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl border border-black/5 bg-white p-6 shadow-xl overflow-hidden">
        {/* Decoración sutil */}
        

        {/* Título */}
        <h2 className="relative z-10 font-jersey-25 text-[44px] leading-none text-primary mb-6">
          Puntajes
        </h2>

        {/* Lista */}
        <div className="relative z-10">
          {loading ? (
            <div className="py-16 text-center text-black/60">Cargando…</div>
          ) : sorted.length === 0 ? (
            <div className="py-16 text-center text-black/60">
              Aún no hay puntajes
            </div>
          ) : (
            <ul className="space-y-5">
              {sorted.slice(0, 6).map((row, idx) => (
                <li key={`${row.nombre}-${idx}`}>
                  <div className="flex items-center gap-4">
                    {/* Posición */}
                    <div className="w-8 text-lg font-semibold">{idx + 1}</div>

                    {/* Icono desde assets */}
                    <div className="flex h-10 w-10 items-center justify-center">
                      <img
                        src={getIconSrc(row.icono)}
                        alt={row.icono ?? "icon"}
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    {/* Nombre */}
                    <div className="flex-1 font-jersey-25 text-[22px] text-black/80">
                      {row.nombre}
                    </div>

                    {/* Puntaje */}
                    <div className="w-16 text-right font-jersey-25 text-[22px]">
                      {row.score}
                    </div>
                  </div>

                  {/* Separador grueso como en el mock */}
                  <div className="mt-3 h-[3px] w-full bg-black" />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-6 flex justify-end">
          <button
            className="rounded-md bg-btn-secondary px-4 py-1.5 text-sm text-white shadow-sm hover:brightness-105 active:scale-[0.98]"
            onClick={() => setScoreModal(false)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;

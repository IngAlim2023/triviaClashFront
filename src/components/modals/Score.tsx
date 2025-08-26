import React, { useEffect, useState } from "react";
import { loadScore } from "../../services/score";
import dragon2 from "../../assets/dragon-2.png";
import gryphon from "../../assets/gryphon.png";

interface ScoreData {
  nombre: string;
  score: number;
  icono: string; // puede ser un string que luego mapeas a la imagen
}

const iconMap: Record<string, string> = {
  dragon2,
  gryphon,
};

interface Props{
    setScoreModal:(val:boolean) => void
}

const Score: React.FC<Props> = ({setScoreModal}) => {
  const [data, setData] = useState<ScoreData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await loadScore();
      setData(res.data);
    };
    loadData();
  }, []);

  console.log(data);
  return (
    <div className="flex w-screen min-h-screen bg-background/60 justify-center items-center fixed inset-0">
      <div className="flex flex-col bg-white p-6 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Jugador</th>
                <th className="px-4 py-2 text-left">Puntaje</th>
                <th className="px-4 py-2 text-left">Icono</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 6).map((val, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-bold">{i + 1}</td>
                  <td className="px-4 py-2">{val.nombre}</td>
                  <td className="px-4 py-2">{val.score}</td>
                  <td className="px-4 py-2">
                    <img
                      src={iconMap[val.icono] || val.icono}
                      alt={val.nombre}
                      className="w-10 h-10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-2 flex flex-row-reverse">
          <button
            className="font-jersey-25 rounded-sm bg-btn-secondary p-1 text-white text-x px-10"
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

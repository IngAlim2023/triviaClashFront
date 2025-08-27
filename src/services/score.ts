const API_URL = "http://localhost:3333";

export const loadScore = async () => {
  const data = await fetch(`${API_URL}/score`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await data.json();
};

// mismos valores que el enum del back
export type ScoreIcon =
  | "gryphon"
  | "chimera"
  | "echidna"
  | "madreMonte"
  | "scarecrow"
  | "summoner"
  | "dragon2"
  | "Basilisk"
  | "bat";

export const addScore = async (payload: {
  nombre: string;
  score: number;
  icono: ScoreIcon;
}) => {
  const res = await fetch(`${API_URL}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST /score ${res.status}: ${text}`);
  }
  return await res.json();
};

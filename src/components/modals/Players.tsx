import React, { useState } from "react";
import Narwhal from "../../assets/Narwhal.png";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import socket from "../../services/socket";
import useGameContext from "../../context/GameHook";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

// Avatares (coinciden con el enum del back)
import batImg from "../../assets/bat.png";
import chimeraImg from "../../assets/chimera.png";
import gryphonImg from "../../assets/gryphon.png";
import echidnaImg from "../../assets/echidna.png";
import madreMonteImg from "../../assets/madre-monte.png";
import scarecrowImg from "../../assets/scarecrow.png";
import summonerImg from "../../assets/summoner.png";
import dragon2Img from "../../assets/dragon-2.png";
import BasiliskImg from "../../assets/Basilisk.png";

type AvatarValue =
  | "gryphon"
  | "chimera"
  | "echidna"
  | "madreMonte"
  | "scarecrow"
  | "summoner"
  | "dragon2"
  | "Basilisk"
  | "bat";

const AVATARS: { value: AvatarValue; label: string; img: string }[] = [
  { value: "bat", label: "Bat", img: batImg },
  { value: "chimera", label: "Chimera", img: chimeraImg },
  { value: "gryphon", label: "Gryphon", img: gryphonImg },
  { value: "echidna", label: "Echidna", img: echidnaImg },
  { value: "madreMonte", label: "Madre Monte", img: madreMonteImg },
  { value: "scarecrow", label: "Scarecrow", img: scarecrowImg },
  { value: "summoner", label: "Summoner", img: summonerImg },
  { value: "dragon2", label: "Dragon 2", img: dragon2Img },
  { value: "Basilisk", label: "Basilisk", img: BasiliskImg },
];

interface Modales {
  playerModal: boolean;
  setPlayerModal: (playerModal: boolean) => void;
}

interface Inputs {
  sala: string;
  salaRequired: string;
  nombre: string;
}

const Players: React.FC<Modales> = ({ playerModal, setPlayerModal }) => {
  const { rooms, setName, setAvatar } = useGameContext();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<Inputs>();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatar, setLocalAvatar] = useState<AvatarValue>("bat");

  const selected = AVATARS.find((a) => a.value === avatar) ?? AVATARS[0];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    socket.emit("newUser", data.nombre);
    setName(data.nombre);
    setAvatar(avatar);
    navigate(`/room/${data.sala}`);
  };

  const options = rooms.map((val) => ({ value: val.code, label: val.code }));

  return (
    <div className="flex w-screen min-h-screen bg-background/60 justify-center items-center fixed inset-0">
      <div className="relative flex flex-col bg-white p-6 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="ml-5 flex items-center gap-4">
          <img src={Narwhal} alt="Narwhal" className="w-20 flex-initial" />
          <h1 className="font-jersey-25 text-primary text-2xl">Jugador</h1>
        </div>

        <div className="relative mt-2 grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 bg-white p-6 rounded-2xl w-full">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-jersey-25">Código de sala</label>
            <Controller
              name="sala"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Sala"
                  value={options.find((option) => option.value === field.value)}
                  onChange={(selected) => field.onChange(selected?.value)}
                  className="w-4/8 font-jersey-25"
                  classNames={{
                    control: () => "border rounded-sm p-1",
                    option: () => "cursor-pointer hover:bg-blue-100",
                    menu: () => "shadow-md rounded-md",
                  }}
                />
              )}
            />

            <label htmlFor="nombre" className="mt-5 font-jersey-25">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Escoge un apodo único"
              className="font-jersey-25 border p-1 rounded-sm"
              {...register("nombre", { required: true })}
            />

            <div className="mt-7 flex gap-3">
              <button className="font-jersey-25 bg-btn-primary text-amber-50 rounded-sm px-4 py-1.5">
                Unirme a la sala
              </button>
            </div>
          </form>

          {/* Selector de Avatar */}
          <div className="relative md:justify-self-end">
            <button
              type="button"
              onClick={() => setAvatarOpen((v) => !v)}
              className="flex items-center justify-between w-44 rounded-2xl border-2 border-black px-3 py-2 bg-white shadow-sm hover:bg-black/[0.03]"
              aria-haspopup="listbox"
              aria-expanded={avatarOpen}
            >
              <span className="inline-flex items-center gap-2">
                <img
                  src={selected.img}
                  alt={selected.label}
                  className="h-6 w-6"
                />
                <span className="font-jersey-25 text-xl leading-none">
                  {selected.label}
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black">
                <path d="M7 10l5 6 5-6z" />
              </svg>
            </button>

            {avatarOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-black/20 bg-white p-2 shadow-lg"
                role="listbox"
              >
                {AVATARS.map((opt) => {
                  const active = avatar === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setLocalAvatar(opt.value);
                        setAvatarOpen(false);
                      }}
                      className={[
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition",
                        active
                          ? "bg-btn-secondary/30"
                          : "hover:bg-black/[0.05]",
                      ].join(" ")}
                      role="option"
                      aria-selected={active}
                    >
                      <img src={opt.img} alt={opt.label} className="h-6 w-6" />
                      <span className="font-jersey-25">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="m-2 flex flex-row-reverse">
          <button
            className="font-jersey-25 rounded-sm bg-btn-secondary p-1 text-white text-x px-10"
            onClick={() => setPlayerModal(!playerModal)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Players;

import React from "react";
import bg from "../assets/background-image.png";
import fairy from "../assets/fairy.png";
import narwhal from "../assets/Narwhal.png";
import dragon from "../assets/dragon.png";

const Home: React.FC = () => {
  return (
    <div
      className="h-full w-full flex items-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="relative max-w-6xl w-full mx-auto px-8 py-12 flex items-start gap-12">
        <button
          className="absolute top-6 right-6 bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center justify-center"
          aria-label="Puntajes"
        >
          <img
            src={fairy}
            alt="Ilustración"
            className="w-[50px] max-w-full h-auto"
          />

          <span className="mt-3 text-sm text-primary font-jersey-25 text-[31px]">
            Puntajes
          </span>
        </button>

        {/* Left column */}
        <div className="flex-1 max-w-xl">
          <h1 className=" text-8xl z-40 leading-none justify-self-start font-jersey-10 text-title">
            Trivia Clash
          </h1>

          <p className="mt-4 text-4xl font-jersey-15 justify-self-start">
            ¿Qué tanto sabes?
          </p>

          <p className="mt-4 text-2xl text-slate-500 font-jersey-25 justify-self-start">
            Crea una sala o únete con un código
          </p>

          <div className="mt-12 flex gap-8">
            <button className="bg-white rounded-2xl shadow-lg p-6 w-50 h-50 flex flex-col items-center justify-center">
              <img
                src={narwhal}
                alt="Ilustración"
                className="w-[100px] max-w-full h-auto"
              />
              <div className="w-20 h-20 bg-center bg-contain" />
              <span className="mt-3 text-sm text-primary font-jersey-25 text-[31px]">
                Jugador
              </span>
            </button>

            <button className="bg-white rounded-2xl shadow-lg p-6 w-50 h-50 flex flex-col items-center justify-center">
              <img
                src={dragon}
                alt="Ilustración"
                className="w-[100px] max-w-full h-auto"
              />
              <div className="w-20 h-20 bg-center bg-contain" />
              <span className="mt-3 text-sm text-primary font-jersey-25 text-[31px]">
                Moderador
              </span>
            </button>
          </div>
        </div>


        <div className="flex">
          <img
            src={bg}
            alt="Ilustración"
            className="w-[800px] max-w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
};

export default Home;

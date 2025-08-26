import React from "react";
import bg from "../assets/background-image.png";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <h1 className=" text-8xl z-40 leading-none justify-self-start font-jersey-10 text-title">
        404
      </h1>
      <div className=" text-6xl z-40 leading-none justify-self-start font-jersey-10 text-title">
        Página no encontrada
      </div>
      <div className="flex">
          <img
            src={bg}
            alt="Ilustración"
            className="w-[100px] max-w-full h-auto"
          />
        </div>
    </div>
  );
};

export default NotFound;

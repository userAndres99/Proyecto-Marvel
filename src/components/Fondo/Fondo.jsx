import React from "react";

const FondoGlobal = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center filter brightness-75 sm:blur-[1px] md:blur-[2px]"
      style={{
        backgroundImage:
          "url('/marvel-comics-wallpaper-4k-fondo-de-pantalla-hd-y-descarga-de-fondo-2048x1252.jpg')",
      }}
    />
  );
};

export default FondoGlobal;
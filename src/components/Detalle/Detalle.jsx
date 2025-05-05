import React from "react";
import Boton from "../Boton/Boton"; 
import Titulo from "../Titulo/Titulo";

const Detalle = ({ personaje }) => {
  if (!personaje) {
    return (
      <Titulo 
        texto="No se han recibido datos del personaje." 
        clase="text-xl text-center"
      />
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto rounded overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('/FondoTarjeta.webp')" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto border rounded p-6 shadow flex flex-col md:flex-row gap-6">
        {/* Parte izquierda*/}
        <div className="md:w-1/2 flex-shrink-0">
          <img
            src={personaje.urlImagen}
            alt={personaje.nombre}
            className="w-full h-auto object-cover rounded"
          />
        </div>
        
        {/* Parte derecha */}
        <div className="md:w-1/2 flex flex-col justify-between text-left p-4 text-blue-950 
                        backdrop-blur-md bg-white/20 rounded">
          <div className="space-y-6 drop-shadow-lg">
            <p className="text-3xl font-black">
              <span className="underline">Nombre:</span> 
              <span className="ml-2 font-black">{personaje.nombre}</span>
            </p>
            <p className="text-xl font-black">
              <span className="underline">Alias:</span> 
              <span className="ml-2 font-black">{personaje.alias}</span>
            </p>
            <p className="text-xl font-black">
              <span className="underline">Habilidades:</span> 
              <span className="ml-2 font-black">{personaje.habilidades}</span>
            </p>
            <p className="text-xl font-black">
              <span className="underline">Descripción:</span> 
              <span className="ml-2 font-black">{personaje.descripcion}</span>
            </p>
            <p className="text-xl font-black">
              <span className="underline">Tipo:</span> 
              <span className="ml-2 font-black">{personaje.heroe ? "Héroe" : "Villano"}</span>
            </p>
          </div>
          <Boton 
            text="Añadir a Favoritos"
            onClick={() => console.log("Añadir a Favoritos")}
            clase="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded self-start"
          />
        </div>
      </div>
    </div>
  );
};

export default Detalle;

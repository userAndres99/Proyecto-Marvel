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
    <div className="max-w-4xl mx-auto border rounded p-6 shadow flex flex-col md:flex-row gap-6">
      {/* parte izquierda (de la image)*/}
      <div className="md:w-1/2 flex-shrink-0">
        <img
          src={personaje.urlImagen}
          alt={personaje.nombre}
          className="w-full h-auto object-cover rounded"
        />
      </div>
      
      {/* parte derecha (de los datos)*/}
      <div className="md:w-1/2 flex flex-col justify-between text-left">
        <div className="space-y-6">
          <p className="text-3xl font-bold">
            <span className="font-semibold">Nombre:</span> {personaje.nombre}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Alias:</span> {personaje.alias}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Habilidades:</span> {personaje.habilidades}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Descripción:</span> {personaje.descripcion}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Tipo:</span> {personaje.heroe ? "Héroe" : "Villano"}
          </p>
        </div>
        <Boton 
          text="Añadir a Favoritos"
          onClick={() => console.log("Añadir a Favoritos")}
          clase="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded self-start"
        />
      </div>
    </div>
  );
};

export default Detalle;
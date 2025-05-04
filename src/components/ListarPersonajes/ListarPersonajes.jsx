import React from "react";
import { Link } from "react-router-dom";
import Boton from "../Boton/Boton"; 

const ListarPersonajes = ({ personajes, centrado = false }) => {
  // Si "centrado" es true, usamos grid con una sola columna y centrado, de lo contrario el grid original
  const clasesGrid = centrado  //el centrado es para cuando se busca un personaje..en el listado de personajes no se usa (me complique la vida xD)
    ? "grid grid-cols-1 place-items-center gap-8"
    : "grid grid-cols-1 md:grid-cols-3 gap-8";

  return (
    <div className={clasesGrid}>
      {personajes.map((personaje) => (
        <div
          key={personaje.id}
          className="border p-4 rounded shadow flex flex-col items-center"
        >
          <div className="w-70 h-120 overflow-hidden mb-4">
            <img
              src={personaje.urlImagen}
              alt={personaje.nombre}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">{personaje.nombre}</h2>
          <Link to={`/detallePersonaje/${personaje.id}`} state={{ personaje }}>
            <Boton 
              text="Detalles" 
              clase="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListarPersonajes;

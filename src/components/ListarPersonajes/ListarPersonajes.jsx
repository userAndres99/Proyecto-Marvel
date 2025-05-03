import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DetallePersonaje } from "../../pages/DetallePersonaje/DetallePersonaje";

const ListarPersonajes = ({ personajes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <Link to={`/detallePersonaje/${personaje.id}`} state ={{personaje}}
          >
          <button  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Detalles
          </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListarPersonajes;
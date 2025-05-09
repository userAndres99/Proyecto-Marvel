import React from "react";
import { Link } from "react-router-dom";
import Boton from "../Boton/Boton"; 
import { ROUTES } from "../../const/routes";
import { useTranslation } from "react-i18next";

const ListarPersonajes = ({ personajes, centrado = false }) => {

  const { t } = useTranslation();
  
  // Si "centrado" es true, usamos grid con una sola columna y centrado, de lo contrario el grid original
  const clasesGrid = centrado  //el centrado es para cuando se busca un personaje..en el listado de personajes no se usa (me complique la vida xD)
    ? "grid grid-cols-1 place-items-center gap-8"
    : "grid grid-cols-1 md:grid-cols-3 gap-8";

  return (
    <div className={clasesGrid}>
      {personajes.map((personaje) => (
        <div
          key={personaje.id}
          style={{ backgroundImage: `url('/FondoTarjeta.webp')` }}
          className="border p-4 rounded shadow flex flex-col items-center bg-cover bg-center 
                     transition-all duration-300 transform 
                     hover:scale-105 hover:border-2 hover:border-white hover:shadow-2xl"
        >
          <div className="w-64 sm:w-70 h-80 sm:h-120 overflow-hidden mb-4">
            <img
              src={personaje.urlImagen}
              alt={personaje.nombre}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-white">{personaje.nombre}</h2>
          <Link to={`${ROUTES.Detalle.replace(":id", personaje.id)}`} state={{ personaje }}>
            <Boton 
              text={t("details")}
              clase="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListarPersonajes;
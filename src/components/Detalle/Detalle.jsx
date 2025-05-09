import React from "react";
import Boton from "../Boton/Boton"; 
import Titulo from "../Titulo/Titulo";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Detalle = ({ personaje }) => {
  const { t } = useTranslation();

  if (!personaje) {
    return (
      <Titulo 
        texto={t("noCharacterData")}
        clase="text-xl text-center"
      />
    );
  }

  const [esFavorito, setEsFavorito] = useState(false);

  // Comprobar si el personaje es favorito 
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
    setEsFavorito(favoritos.includes(personaje.id));
  }, [personaje.id]);

  // Función para agregar
  const agregarAFavoritos = () => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

    if (!favoritos.includes(personaje.id)) {
      favoritos.push(personaje.id);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setEsFavorito(true);
      //console.log(`Personaje con id ${personaje.id} añadido a favoritos`);
    }
  };

  // Función para eliminar 
  const eliminarDeFavoritos = () => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

    if (favoritos.includes(personaje.id)) {
      const nuevosFavoritos = favoritos.filter((favId) => favId !== personaje.id);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setEsFavorito(false);
     // console.log(`Personaje con id ${personaje.id} eliminado de favoritos`);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto rounded overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('/FondoTarjeta.webp')" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto border rounded p-4 md:p-6 shadow flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Parte izquierda*/}
        <div className="md:w-1/2 flex-shrink-0">
          <img
            src={personaje.urlImagen}
            alt={personaje.nombre}
            className="w-full h-auto object-cover rounded"
          />
        </div>
        
        {/* Parte derecha */}
        <div className="md:w-1/2 flex flex-col justify-between text-left p-4 text-white backdrop-blur-md bg-black/70 rounded">
          <div className="space-y-4 md:space-y-6 drop-shadow-lg">
            <p className="text-2xl md:text-3xl font-black">
              <span className="underline text-red-600">{t("name")}:</span>
              <span className="ml-2 font-black">{personaje.nombre}</span>
            </p>
            <p className="text-lg md:text-xl font-black">
              <span className="underline text-red-600">{t("alias")}:</span>
              <span className="ml-2 font-black">{personaje.alias}</span>
            </p>
            <p className="text-lg md:text-xl font-black">
              <span className="underline text-red-600">{t("abilities")}:</span>
              <span className="ml-2 font-black">{personaje.habilidades}</span>
            </p>
            <p className="text-lg md:text-xl font-black">
              <span className="underline text-red-600">{t("description")}:</span>
              <span className="ml-2 font-black">{personaje.descripcion}</span>
            </p>
            <p className="text-lg md:text-xl font-black">
              <span className="underline text-red-600">{t("type")}:</span>
              <span className="ml-2 font-black">{t(personaje.heroe ? "heroe" : "villain")}</span>
            </p>
          </div>
          <Boton 
            text={ esFavorito ? t("removeFromFavorites") : t("addToFavorites") }
            onClick={ esFavorito ? eliminarDeFavoritos : agregarAFavoritos }
            clase="mt-6 bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded self-start"
          />
        </div>
      </div>
    </div>
  );
};

export default Detalle;
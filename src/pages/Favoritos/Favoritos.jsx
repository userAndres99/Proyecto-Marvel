import React, { useState, useEffect } from "react";
import Titulo from "../../components/Titulo/Titulo.jsx";
import { getPersonajeID } from "../../services/getPersonajeID.js";
import { useTranslation } from "react-i18next";
import ListarPersonajes from "../../components/ListarPersonajes/ListarPersonajes"; 
import Fondo from "../../components/Fondo/Fondo"; 
import Boton from "../../components/Boton/Boton";
import { useNavigate } from "react-router-dom"; 

export default function Favoritos() {
  const { t, i18n } = useTranslation();;
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Leer el idioma guardado en el localStorage (por defecto español)
    const idiomaUsuario = localStorage.getItem("idioma") || "es";
    i18n.changeLanguage(idiomaUsuario);
  }, [i18n]);

  useEffect(() => {
    // Obtener los IDs de favoritos guardados en localStorage
    const favoritosGuardados = localStorage.getItem("favoritos");
    const idsFavoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

    // .map para recorrer los IDs y obtener los personajes
    const fetchPromises = idsFavoritos.map((id) => getPersonajeID(id));

    // promise.all para esperar a que todas las promesas terminen
    Promise.all(fetchPromises)
      .then((resultados) => {
        setFavoritos(resultados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los personajes favoritos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-center items-center">
      <Fondo />
      <div className="relative z-10 container mx-auto p-4 md:p-8 flex flex-col items-center">
        <Titulo 
          texto={t("loadingCharacters")} 
          clase="text-center text-xl md:text-2xl"
        />
        <img 
          src="/marvelLoading.gif" 
          alt="Loading Marvel" 
          className="mt-4 w-64 md:w-80" 
        />
      </div>
    </div>
  );
}

  if (favoritos.length === 0) {
    return (
      <div className="relative min-h-screen">
        <Fondo />
        <div className="relative z-10 container mx-auto p-4 md:p-8 mt-4 md:mt-10 flex flex-col items-center">
          <div className="flex justify-start w-full">
            <Boton 
              text={t("back")} 
              onClick={() => navigate(-1)}
              clase="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            />
          </div>
          <Titulo texto={t("resultFavorites")} clase="text-xl text-center my-8" />
          <div
            style={{ backgroundImage: "url('/noFavoritos.jpeg')" }}
            className="mx-auto my-8 border p-4 rounded shadow flex flex-col items-center bg-cover bg-center transition-all duration-300 transform hover:scale-105 hover:border-2 hover:border-white hover:shadow-2xl w-full max-w-[32rem] h-auto md:h-[32rem]"
          >
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Fondo />
      <div className="relative z-10 container mx-auto p-4 md:p-8 mt-4 md:mt-10">
        <div className="flex justify-start w-full">
          <Boton 
            text={t("back")} 
            onClick={() => navigate(-1)}
            clase="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          />
        </div>
        <Titulo texto={t("favorites")} clase="text-3xl font-bold text-center mb-8" />
        <ListarPersonajes personajes={favoritos} />
      </div>
    </div>
  );
}
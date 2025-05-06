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
    return <div>{t("loadingCharacters")}</div>;
  }

  if (favoritos.length === 0) {
    return (
      <Titulo texto={t("resultFavorites")} clase="text-xl text-center my-8" />
    );
  }

  return (
    <div className="relative min-h-screen">
      <Fondo />
      <div className="relative z-10 container mx-auto p-8 mt-10">
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
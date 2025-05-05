import React, { useState, useEffect } from "react";
import Titulo from "../../components/Titulo/Titulo.jsx";
import { getPersonajeID } from "../../services/getPersonajeID.js";
import { useTranslation } from "react-i18next";
import ListarPersonajes from "../../components/ListarPersonajes/ListarPersonajes"; // Importamos el componente de listado

export default function Favoritos() {
  const { t, i18n } = useTranslation();;
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  let idiomaUsuario='en';
    useEffect(() => {
      i18n.changeLanguage(idiomaUsuario);
    }, [idiomaUsuario, i18n]);

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
    <div className="max-w-6xl mx-auto py-8">
      <Titulo texto={t("favorites")} clase="text-3xl font-bold text-center mb-8" />
      <ListarPersonajes personajes={favoritos} />
    </div>
  );
}

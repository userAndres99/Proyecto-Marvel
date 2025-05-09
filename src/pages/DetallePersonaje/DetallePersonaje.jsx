import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPersonajeID } from "../../services/getPersonajeID";
import Detalle from "../../components/Detalle/Detalle";
import Fondo from "../../components/Fondo/Fondo";
import Titulo from "../../components/Titulo/Titulo";  
import Boton from "../../components/Boton/Boton";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../const/routes";

export function DetallePersonaje() {
  const location = useLocation(); // toma los datos de el state en el Link  
  const { id } = useParams(); // toma el id que viene en la url, al cambiar el id en la url se cambia en la variable
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Leer el idioma guardado en el localStorage (por defecto español)
    const idiomaUsuario = localStorage.getItem("idioma") || "es";
    i18n.changeLanguage(idiomaUsuario);
  }, [i18n]);

  // Acá si el personaje no existe, lo traemos de la API
  // Si existe, lo traemos de la location.state (que es el estado que pasamos desde la página de personajes)
  const [personaje, setPersonaje] = useState(location.state?.personaje);
  const [cargando, setCargando] = useState(!personaje);

  useEffect(() => {
    if (!personaje) {
      getPersonajeID(id)
        .then((data) => {  // El .then es para que cuando se resuelva la promesa, se ejecute la función
          // Si no se encontró data, redirigimos a la página NotFound
          if (!data) {
            navigate(ROUTES.NotFound);
            return;
          }
          setPersonaje(data);
          setCargando(false);
        })
        .catch(() => {
          // En caso de error, redirigimos a NotFound
          navigate(ROUTES.NotFound);
        });
    }
  }, [id, personaje, navigate]);

  if (cargando) {
    return <p className="mt-20 text-center text-xl">{t("loading")}</p>;
  }

  return (
    <div className="relative min-h-screen">
      <Fondo />
      
      <div className="relative z-10 p-4 md:p-8 mt-10 md:mt-20">
        <div className="flex justify-start w-full">
          <Boton 
            text={t("back")} 
            onClick={() => navigate(-1)}
            clase="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
          />
        </div>

        <Titulo 
          texto={t("detailCharacter")} 
          clase="text-2xl md:text-3xl font-bold mb-4"
        />
        <Detalle personaje={personaje} />
      </div>
    </div>
  );
}
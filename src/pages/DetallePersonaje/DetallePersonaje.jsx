import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPersonajeID } from "../../services/getPersonajeID";
import Detalle from "../../components/Detalle/Detalle";
import Fondo from "../../components/Fondo/Fondo";
import Titulo from "../../components/Titulo/Titulo"; 
import Boton from "../../components/Boton/Boton";
import { useTranslation } from "react-i18next";



export function DetallePersonaje() {
  const location = useLocation(); // toma los datos de el state en el Link  
  const { id } = useParams(); // tomas el id que viene en la url, al cambiar el el id en la url se cambia en la variable
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Leer el idioma guardado en el localStorage (por defecto español)
    const idiomaUsuario = localStorage.getItem("idioma") || "es";
    i18n.changeLanguage(idiomaUsuario);
  }, [i18n]);



  // aca si el personaje no existe, lo traemos de la API
  // si existe, lo traemos de la location.state (que es el estado que pasamos desde la pagina de personajes)
  const [personaje, setPersonaje] = useState(location.state?.personaje);
  const [Cargando, setCargando] = useState(!personaje);

  useEffect(() => {
    if (!personaje) {
      getPersonajeID(id)
        .then((data) => {  //el .then es para que cuando se resuelva la promesa, se ejecute la funcion
          setPersonaje(data);
          setCargando(false);
        })
        .catch(() => {
          navigate("/");
        });
    }
  }, [id, personaje, navigate]);

  if (Cargando) {
    return <p className="mt-20 text-center text-xl">{t("loading")}</p>;
  }

  return (
    <div className="relative min-h-screen">
      <Fondo />
      
      <div className="relative z-10 p-4 mt-10">
      <div className="flex justify-start w-full">
        <Boton 
          text={t("back")} 
          onClick={() => navigate(-1)}
          clase="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
        />
      </div>

      <Titulo 
        texto={t("detailCharacter")} 
        clase="text-2xl font-bold mb-4"
      />
        <Detalle personaje={personaje} />
      </div>
    </div>
  );
}
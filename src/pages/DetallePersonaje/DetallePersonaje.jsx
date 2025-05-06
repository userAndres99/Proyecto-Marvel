import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPersonajeID } from "../../services/getPersonajeID";
import Detalle from "../../components/Detalle/Detalle";
import Fondo from "../../components/Fondo/Fondo";
import Titulo from "../../components/Titulo/Titulo";  
import Boton from "../../components/Boton/Boton";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../const/routes";
import jsPDF from 'jspdf';


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
  const generarPDF = () => {
    const doc = new jsPDF();
  
    // Estilo general
    doc.setFillColor(240, 240, 240);
    doc.rect(5, 5, 200, 287, "F");
  
    // Título
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 100);
    doc.text(`${t("detailCharacter")}: ${personaje.nombre}`, 10, 20);
  
    let y = 50;
  
    // Datos del personaje
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${t("name")}: ${personaje.nombre}`, 10, y);
    y += 10;
    doc.text(`${t("alias")}: ${personaje.alias || 'N/A'}`, 10, y);
    y += 10;
    doc.text(`${t("type")}: ${t(personaje.heroe ? "heroe" : "villain")}`, 10, y);
    y += 10;
  
    // Habilidades (multi línea)
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 100);
    doc.text(`${t("abilities")}:`, 10, y);
    y += 8;
  
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const habilidades = personaje.habilidades || t("noAbilities");
    const habilidadesTexto = doc.splitTextToSize(habilidades, 180);
    doc.text(habilidadesTexto, 10, y);
    y += habilidadesTexto.length * 6 + 4;
  
    // Descripción (multi línea)
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 100);
    doc.text(`${t("description")}:`, 10, y);
    y += 8;
  
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const descripcion = doc.splitTextToSize(personaje.descripcion || t("noDescription"), 180);
    doc.text(descripcion, 10, y);
  
    // Descargar PDF
    doc.save(`${personaje.nombre}.pdf`);
  };
  
  
  if (cargando) {
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
          <Boton 
  text={t("downloadPDF")} 
  onClick={generarPDF}
  clase="bg-red-600 hover:bg-red-400 text-white ml-2"
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
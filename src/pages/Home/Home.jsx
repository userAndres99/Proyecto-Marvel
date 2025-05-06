import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ROUTES } from '../../const/routes';

//---importacion de componentes
import Boton from '../../components/Boton/Boton';
//--------------------------------


export default function Home() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  useEffect(() => {
    // Leer el idioma guardado en el localStorage (por defecto español)
    const idiomaUsuario = localStorage.getItem("idioma") || "es";
    i18n.changeLanguage(idiomaUsuario);
  }, [i18n]);
  return (
    <>
     
      <div className="flex h-screen mt-10">
        {/* Mitad Heroes */}
        <div
  onMouseEnter={() => setHovered('heroes')}
  onMouseLeave={() => setHovered(null)}
  onClick={() => navigate(`${ROUTES.Personajes}?heroe=true`)}
  className="w-1/2 bg-cover bg-center relative flex justify-center transition-all duration-300 cursor-pointer hover:brightness-90"
  style={{
    backgroundImage: "url('/heroes.jpg')",
    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
    filter: hovered === 'villanos' ? 'blur(3px)' : 'none',
  }}
>
  <div className="absolute top-10 bg-red-700/80 px-5 py-3 rounded-lg shadow-lg">
    <h2 className="text-white text-6xl font-bold text-center">
      {t("heroes")}
    </h2>
  </div>
</div>

<div
  onMouseEnter={() => setHovered('villanos')}
  onMouseLeave={() => setHovered(null)}
  onClick={() => navigate(`${ROUTES.Personajes}?heroe=false`)}
  className="w-1/2 bg-cover bg-center relative flex justify-center transition-all duration-300 cursor-pointer hover:brightness-90"
  style={{
    backgroundImage: "url('/villanos.webp')",
    clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
    filter: hovered === 'heroes' ? 'blur(3px)' : 'none',
  }}
>
  <div className="absolute top-10 bg-red-700/80 px-10 py-6 rounded-lg shadow-lg">
  <h2 className="text-white text-6xl font-bold text-center">
  {t("villains")}
    </h2>
  </div>
</div>


      </div>

    </>
  );
}
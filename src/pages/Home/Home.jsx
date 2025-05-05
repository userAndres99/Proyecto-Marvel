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
  let idiomaUsuario='en';
  useEffect(() => {
    i18n.changeLanguage(idiomaUsuario);
  }, [idiomaUsuario, i18n]);
  return (
    <>
     
      <div className="flex h-screen mt-10">
        {/* Mitad Heroes */}
        <div
          onMouseEnter={() => setHovered('heroes')}
          onMouseLeave={() => setHovered(null)}
          className="w-1/2 bg-cover bg-center flex items-center justify-end pr-15 transition-all duration-300"
          style={{
            backgroundImage: "url('/heroes.jpg')",
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
            filter: hovered === 'villanos' ? 'blur(3px)' : 'none',
          }}
        >
          <Boton
            text={t("heroes")}
            onClick={() => navigate(`${ROUTES.Personajes}?heroe=true`)} 
          />
        </div>

        {/* Mitad Villanos */}
        <div
          onMouseEnter={() => setHovered('villanos')}
          onMouseLeave={() => setHovered(null)}
          className="w-1/2 bg-cover bg-center flex items-center justify-start pl-15 transition-all duration-300"
          style={{
            backgroundImage: "url('/villanos.webp')",
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            filter: hovered === 'heroes' ? 'blur(3px)' : 'none',
          }}
        >
          <Boton
            text={t("villains")}
            onClick={() => navigate(`${ROUTES.Personajes}?heroe=false`)}
          />
        </div>
      </div>

    </>
  );
}

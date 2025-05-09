import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Boton from "../Boton/Boton";
import { Buscador } from "../Buscador/Buscador";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../const/routes";

const Header = () => {
  const navigate = useNavigate();
  
  const handleBuscar = (nombreBuscado) => {
    navigate(`${ROUTES.Personajes}?busqueda=${encodeURIComponent(nombreBuscado)}`);
  };

  const { t, i18n } = useTranslation();

  const cambiarIdioma = (idioma) => {
    i18n.changeLanguage(idioma);
    localStorage.setItem("idioma", idioma);
  };

  return (
    <header className="bg-gray-800 text-blue fixed top-0 left-0 right-0 w-full z-50 shadow-md px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/">
          <img
            src="/Marvel-Comics-Logo.png"
            alt="Marvel Logo"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain max-w-[100px] sm:max-w-[140px] md:max-w-[180px]"
          />
        </Link>
        <Buscador onBuscar={handleBuscar} />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 mt-2 md:mt-0">
        <div className="relative">
          <label htmlFor="idioma-select" className="sr-only">Idioma</label>
          <select
            id="idioma-select"
            className="bg-white text-gray-800 px-3 py-2 rounded"
            value={i18n.language}
            onChange={(e) => cambiarIdioma(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        
        <Boton
          text={t("favorites")}
          onClick={() => navigate(ROUTES.Favoritos)}
          clase="bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-md"
        />
      </div>
    </header>
  );
};

export default Header;

// src/components/Header/Header.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import { Buscador } from "../Buscador/Buscador";

const Header = () => {
  const navigate = useNavigate();

  // no puse el getPersonaje aca porque quedaba feo, mejor navegamos a /personajes con el término de búsqueda y ahi se hace el get.
  // si se hace clic en el botón de búsqueda, se redirige a la página de personajes con el nombre buscado.
  const handleBuscar = (nombreBuscado) => {
    navigate(`/personajes?busqueda=${encodeURIComponent(nombreBuscado)}`);
  };

  return (
    <header className={`${styles.header} flex items-center justify-between px-4 py-2 bg-gray-900 text-white`}>
      <div className="flex items-center ml-4">
        <img
          src="/public/icons-marvel.png"
          alt="Marvel Logo"
          className="h-16 w-auto mr-4"
        />
        <Titulo text="Proyecto Marvel" />
      </div>
      <div className="flex items-center space-x-4 mr-4">
        <Buscador onBuscar={handleBuscar} />
        <Boton text="Favoritos" onClick={() => console.log("Favoritos seleccionados")} />
      </div>
    </header>
  );
};

export default Header;
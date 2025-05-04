import React from "react";
import { useNavigate,Link  } from "react-router-dom";
import Boton from "../Boton/Boton";
import { Buscador } from "../Buscador/Buscador";

const Header = () => {
  const navigate = useNavigate();

  const handleBuscar = (nombreBuscado) => {
    navigate(`/personajes?busqueda=${encodeURIComponent(nombreBuscado)}`);
  };

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 right-0 w-full z-50 shadow-md px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-6">
      <Link to="/">
          <img
            src="/public/Marvel-Comics-Logo.png"
            alt="Marvel Logo"
            className="h-17 w-70"
          />
        </Link>
        
        <Buscador onBuscar={handleBuscar} />
      </div>

      <div className="flex items-center">
        <Boton text="Favoritos" onClick={() => console.log("Favoritos seleccionados")} />
      </div>
    </header>
  );
};

export default Header;
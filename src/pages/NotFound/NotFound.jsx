import React from "react";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/Titulo/Titulo";
import Boton from "../../components/Boton/Boton";
import Fondo from "../../components/Fondo/Fondo";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../const/routes";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen">
      <Fondo /> 
      <div className="relative z-10 mt-20 text-center px-4">
        <Titulo texto={t("pageNotFound") || "Página no encontrada"} clase="text-2xl sm:text-3xl font-bold" />
        
        <div
          style={{ backgroundImage: "url('/DeadpoolNotFound.jpeg')" }}
          className="mx-auto my-8 border p-4 rounded shadow flex flex-col items-center bg-cover bg-center transition-all duration-300 transform hover:scale-105 hover:border-2 hover:border-white hover:shadow-2xl w-80 sm:w-96 h-80 sm:h-96"
        >
        </div>
        
        <Boton 
          text={t("backToHome") || "Volver a inicio"}
          onClick={() => navigate(ROUTES.Home)}
          clase="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        />
      </div>
    </div>
  );
};

export default NotFound;
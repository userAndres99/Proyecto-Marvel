import React from "react";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/Titulo/Titulo";
import Boton from "../../components/Boton/Boton";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="mt-20 text-center">
      <Titulo texto={t("pageNotFound") || "Página no encontrada"} clase="text-3xl font-bold" />
      <Boton 
        text={t("backToHome") || "Volver a inicio"}
        onClick={() => navigate("/")}
        clase="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      />
    </div>
  );
};

export default NotFound;
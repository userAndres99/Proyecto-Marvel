import React, { useState } from "react";
import Boton from "../Boton/Boton.jsx";
import Input from "../Input/Input.jsx";
import { useTranslation } from "react-i18next";

/**
 * Este componente permite buscar personajes por nombre.
 * @param {Function} onBuscar - Función que se ejecuta cuando se envía el formulario.
 */
export function Buscador({ onBuscar }) {
  // Estado para el valor del input
  const [inputValue, setInputValue] = useState("");
  const { t, i18n } = useTranslation();

  // Actualiza el estado con el nuevo valor del input
  const handleChange = (nuevoValor) => {
    setInputValue(nuevoValor);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (inputValue.trim()) {
      onBuscar(inputValue.trim());
      setInputValue(""); // Limpia el input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <Input
        name="busqueda"
        value={inputValue}
        onChange={handleChange}
        placeholder={t("searchPlaceholder")}
        clase="w-full sm:w-80 px-2 sm:px-4 py-1 sm:py-2 border border-gray-400 rounded-lg bg-gray-200 focus:ring-2 focus:ring-blue-500"
      />
      <Boton 
        text={t("search")} 
        type="submit" 
        clase="w-full sm:w-auto bg-red-600 hover:bg-red-900 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded-md"
      />
    </form>
  );
}
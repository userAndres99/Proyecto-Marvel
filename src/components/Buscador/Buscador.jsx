import React, { useState } from "react";
import Boton from "../Boton/Boton.jsx";
import Input from "../Input/Input.jsx";

/**
 * Este componente permite buscar personajes por nombre.
 * @param {Function} onBuscar - Función que se ejecuta cuando se envía el formulario.
 */
export function Buscador({ onBuscar }) {
  // Estado para el valor del input
  const [inputValue, setInputValue] = useState("");

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
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input
        name="busqueda"
        value={inputValue}
        onChange={handleChange}
        placeholder="Buscar nombre del heroe o villano..."
        className="w-80 px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <Boton text="Buscar" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" />
    </form>
  );
}
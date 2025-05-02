// src/components/Buscador/Buscador.jsx

import React, { useState } from "react";
import Boton from "../Boton/Boton.jsx"; 
import Input from "../Input/Input.jsx"; 
/**
 * este componente es un buscador que permite buscar personajes por nombre.
 * @param {onBuscar} onBuscar es una funcion que se ejecuta cuando se envia el formulario
 */
export function Buscador({ onBuscar }) {

  //el inputValue es el valor del input
  const [inputValue, setInputValue] = useState("");

  //handleChange es la funcion que se ejecuta cuando cambia el valor del input
  const handleChange = (nuevoValor) => {
    setInputValue(nuevoValor);   // Actualiza el estado con el nuevo valor
  };

  //handleSubmit es la funcion que se ejecuta cuando se envia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();   //para evitar que la pagina se recargue 
    if (inputValue.trim()) {
      onBuscar(inputValue.trim());  //
      setInputValue(""); // Limpia el input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <Input
        name="busqueda"
        value={inputValue}
        onChange={handleChange}
        placeholder="Buscar por nombre del heroe o villano"
      />
      <Boton text="Buscar" type="submit" />
    </form>
  );
}
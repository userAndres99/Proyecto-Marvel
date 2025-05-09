import React from "react";
/**
 * componente Boton
 * 
 * @param {string} text - texto que se muestra en el boton
 * @param {function} onClick - funcion que se ejecuta al hacer click en el boton
 * @param {boolean} disabled - si el boton esta deshabilitado o no
 * @param {string} clase - clases adicionales para el boton
 * 
 */
const Boton = ({ text, onClick, disabled, clase = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-base rounded-md shadow transition-all duration-200 ${clase}`}
    >
      {text}
    </button>
  );
};

export default Boton;

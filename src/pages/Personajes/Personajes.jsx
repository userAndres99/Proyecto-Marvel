// src/pages/Personajes/Personajes.jsx

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getInformacion } from '../../services/getInformacion';
import { getPersonaje } from '../../services/buscarPersonaje';

const Personajes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // vemos si busqueda tiene un valor, si no lo tiene es porque no se está buscando nada.
  const busqueda = queryParams.get('busqueda');

  // Para el listado normal se usa el parámetro "heroe", en caso de no estar haciendo búsqueda.
  const heroeParam = queryParams.get('heroe');
  const esHeroe = heroeParam === "true";

  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerPersonajes() {
      try {
        if (busqueda) {  //si es una búsqueda se entra por aca
          const personajeEncontrado = await getPersonaje(busqueda);
          setPersonajes(personajeEncontrado ? [personajeEncontrado] : []);
        } else {  //sino es buqueda entonces seguro es el listado normal
          const datos = await getInformacion(esHeroe);
          setPersonajes(datos);
        }
      } catch (error) {
        console.error("Error al cargar los personajes:", error);
      } finally {
        setCargando(false);
      }
    }
    obtenerPersonajes();
  }, [busqueda, esHeroe]);

  if (cargando) {
    return <p>Cargando personajes...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <Link>
        <NavLink to="/">Volver</NavLink>
      </Link>
      {busqueda ? (
        <h1 className="text-4xl font-bold text-center mb-8">
          Resultado de búsqueda: {busqueda}
        </h1>
      ) : (
        <h1 className="text-4xl font-bold text-center mb-8">
          {esHeroe ? "Héroes" : "Villanos"}
        </h1>
      )}
      {personajes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personajes.map(personaje => (
            <div key={personaje.id} className="border p-4 rounded shadow">
              <img 
                src={personaje.urlImagen} 
                alt={personaje.nombre} 
                className="w-full h-48 object-cover mb-4" 
              />
              <h2 className="text-2xl font-bold">{personaje.nombre}</h2>
              <p className="text-gray-600">{personaje.alias}</p>
              <p>{personaje.descripcion}</p>
              <p className="mt-2 text-sm text-gray-500">{personaje.habilidades}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontró el personaje.</p>
      )}
    </div>
  );
};

export default Personajes;
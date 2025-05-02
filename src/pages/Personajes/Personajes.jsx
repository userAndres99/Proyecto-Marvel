import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getInformacion } from '../../services/getInformacion';
import Header from '../../components/Header/Header';

const Personajes = () => {
  const ubicacion = useLocation(); // useLocation sirve para obtener la ubicación que hay en la URL
  const parametrosConsulta = new URLSearchParams(ubicacion.search); // Obtiene los parámetros de consulta de la URL.....ejmplo: ?heroe=true
  const esHeroe = parametrosConsulta.get('heroe') === "true"; //convierte el string "true" a booleano: true o false

  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerPersonajes() {
      try {
        const datos = await getInformacion(esHeroe); 
        setPersonajes(datos);
      } catch (error) {
        console.error("Error al cargar los personajes:", error);
      } finally {
        setCargando(false);
      }
    }

    obtenerPersonajes();
  }, [esHeroe]);

  if (cargando) {
    return <p>Cargando personajes...</p>;
  }

  return (
    
    
    <div className="container mx-auto p-8">
      <Header />
     <Link>
     <NavLink to="/">Volver</NavLink>
     </Link>
      <h1 className="text-4xl font-bold text-center mb-8">
        {esHeroe ? "Héroes" : "Villanos"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {personajes.map(personaje => (
          <div key={personaje.id} className="border p-4 rounded shadow">
            <img src={personaje.urlImagen} alt={personaje.nombre} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-2xl font-bold">{personaje.nombre}</h2>
            <p className="text-gray-600">{personaje.alias}</p>
            <p>{personaje.descripcion}</p>
            <p className="mt-2 text-sm text-gray-500">{personaje.habilidades}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personajes;

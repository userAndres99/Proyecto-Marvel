import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInformacion } from "../../services/getInformacion";
import { getPersonaje } from "../../services/buscarPersonaje";
import ListarPersonajes from "../../components/ListarPersonajes/ListarPersonajes"; // Importa el nuevo componente

const Personajes = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryParams = new URLSearchParams(location.search);

  // Si "busqueda" tiene un valor, es porque se está buscando algo...si no, es un listado normal
  const busqueda = queryParams.get("busqueda");

  // Para el listado normal se usa el parámetro "heroe"
  const heroeParam = queryParams.get("heroe");
  const esHeroe = heroeParam === "true";

  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerPersonajes() {
      try {
        if (busqueda) {  // Si hay una búsqueda
          const personajeEncontrado = await getPersonaje(busqueda);
          setPersonajes(personajeEncontrado ? [personajeEncontrado] : []);
        } else {  // Si no hay búsqueda, se cargan todos los héroes o villanos
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
    return <p className="mt-20 text-center text-xl">Cargando personajes...</p>;
  }

  return (
    <div className="container mx-auto p-8  mt-20">
      <div className="flex justify-start w-full">
        <button onClick={() => navigate(-1)} className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Volver
        </button>
      </div>
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
        <ListarPersonajes personajes={personajes} />
      ) : (
        <p>No se encontró el personaje.</p>
      )}
    </div>
  );
};

export default Personajes;
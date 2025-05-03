import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInformacion } from "../../services/getInformacion";
import { getPersonaje } from "../../services/buscarPersonaje";
import ListarPersonajes from "../../components/ListarPersonajes/ListarPersonajes";

const Personajes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parametrosURL = new URLSearchParams(location.search);  // Obtenemos los parámetros de búsqueda de la URL

  // Parmetro de búsqueda
  const busqueda = parametrosURL.get("busqueda");  

  // Selector para heroe o vilano
  const heroeParam = parametrosURL.get("heroe");  
  const esHeroe = heroeParam === "true";  // como el valor de heroe es un string, lo convertimos a booleano

  
  const parametroPagina = parametrosURL.get("page");  
  const paginaActual = parametroPagina ? parseInt(parametroPagina, 10) : 1;  // Obtenemos el numero de pagina actual, si no existe, lo inicializamos en 1

  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tieneMas, setTieneMas] = useState(true);  //le puse tieneMas por "tieneMasDatos"

  useEffect(() => {
    async function obtenerPersonajes() {
      try {
        if (busqueda) {
          const personajeEncontrado = await getPersonaje(busqueda);
          setPersonajes(personajeEncontrado ? [personajeEncontrado] : []);
          // En busquedas va a ser un solo personaje el resultado por eso le pongo false a tieneMas
          setTieneMas(false);
        } else {
          // Traemos la pagina de a 9 personajes
          const datos = await getInformacion(esHeroe, paginaActual, 9); //el 9 es la cantidad de personajes por pagina
          setPersonajes(datos);

          // Luego, comprobamos la siguiente pagina
          const datosSiguiente = await getInformacion(esHeroe, paginaActual + 1, 9);
          setTieneMas(datosSiguiente.length > 0); // Si hay mas datos en la siguiente pagina "tieneMas" es true
        }
      } catch (error) {
        console.error("Error al cargar los personajes:", error);
      } finally {
        setCargando(false);
      }
    }
    obtenerPersonajes();
  }, [busqueda, esHeroe, paginaActual]);

  if (cargando) {
    return <p className="mt-20 text-center text-xl">Cargando personajes...</p>;
  }

  // para cambiar la pagina...ponemos el numerito por url
  const cambiarPagina = (nuevaPagina) => {
    navigate(`/personajes?heroe=${esHeroe}&page=${nuevaPagina}`);
  };

  return (
    <div className="container mx-auto p-8 mt-20">
      <div className="flex justify-start w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
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
        <>
          <ListarPersonajes personajes={personajes} />
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={!tieneMas}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>No se encontró el personaje.</p>
      )}
    </div>
  );
};

export default Personajes;
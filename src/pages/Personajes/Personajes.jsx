import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInformacion } from "../../services/getInformacion";
import { getPersonajeNombre } from "../../services/getPersonajeNombre";
import ListarPersonajes from "../../components/ListarPersonajes/ListarPersonajes";
import Fondo from "../../components/Fondo/Fondo"; 
import Titulo from "../../components/Titulo/Titulo";  
import Boton from "../../components/Boton/Boton";  
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../const/routes";  

const Personajes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parametrosURL = new URLSearchParams(location.search);  // Obtenemos los parámetros de búsqueda de la URL
  const { t, i18n } = useTranslation();
 
  useEffect(() => {
    // Leer el idioma guardado en el localStorage (por defecto español)
    const idiomaUsuario = localStorage.getItem("idioma") || "es";
    i18n.changeLanguage(idiomaUsuario);
  }, [i18n]);
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
          const personajeEncontrado = await getPersonajeNombre(busqueda);
          setPersonajes(personajeEncontrado ? [personajeEncontrado] : []);
          // En busquedas va a ser un solo personaje el resultado por eso le pongo false a tieneMas
          setTieneMas(false);
        } else {
          // Traemos la pagina de a 9 personajes
          const datos = await getInformacion(esHeroe, paginaActual, 9); //el 9 es la cantidad de personajes por pagina
          // Si no hay datos en la página y es mayor a 1, redirigimos a NotFound
          if (datos.length === 0 && paginaActual > 1) {
            navigate(ROUTES.NotFound);
            return;
          }
          setPersonajes(datos);

          // Luego, comprobamos la siguiente pagina
          const datosSiguiente = await getInformacion(esHeroe, paginaActual + 1, 9);
          setTieneMas(datosSiguiente.length > 0); // Si hay mas datos en la siguiente pagina "tieneMas" es true
        }
      } catch (error) {
        console.error(t("loadingCharactersError"), error);
      } finally {
        setCargando(false);
      }
    }
    obtenerPersonajes();
  }, [busqueda, esHeroe, paginaActual, navigate, t]);

  if (cargando) {
    return (
      <Titulo 
        texto={t("loadingCharacters")} 
        clase="mt-20 text-center text-xl"
      />
    );
  }

  const cambiarPagina = (nuevaPagina) => {
    setCargando(true);
    setPersonajes([]); // seteamos la lista de personajes a vacia para que no se vea el listado anterior mientras carga el nuevo
    navigate(`/personajes?heroe=${esHeroe}&page=${nuevaPagina}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative min-h-[calc(100vh-60px)]">
      <Fondo />

      <div className="relative z-10 container mx-auto p-8 mt-10">
        <div className="flex justify-start w-full">
          <Boton 
            text={t("back")} 
            onClick={() => navigate(-1)}
            clase="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
          />
        </div>
        {busqueda ? (
          <Titulo
            texto={`${t("searchResult")} ${busqueda}`}
            clase="text-4xl font-bold text-center mb-8"
          />
        ) : (
          <Titulo
            texto={esHeroe ? t("heroes") : t("villains")}
            clase="inline-block text-4xl font-bold px-2 py-1 rounded-md"
          />
        )}
        {personajes.length > 0 ? (
          <>
            {busqueda ? (
              <ListarPersonajes personajes={personajes} centrado={true} />  //si es busqueda lo centramos sino no
            ) : (
              <ListarPersonajes personajes={personajes} />
            )}
            {!busqueda && (
              <div className="flex justify-center mt-8 space-x-4">
                <Boton 
                  text={t("previous")}
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  clase="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
                />
                <Boton 
                  text={t("next")}
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={!tieneMas}
                  clase="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
                />
              </div>
            )}
          </>
        ) : (
          <Titulo
            texto={t("notFoundCharacter")}
            clase="text-2xl text-center mt-8"
          />
        )}
      </div>
    </div>
  );
};

export default Personajes;

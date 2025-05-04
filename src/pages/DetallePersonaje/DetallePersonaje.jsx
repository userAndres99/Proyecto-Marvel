import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPersonajeID } from "../../services/getPersonajeID";
import Detalle from "../../components/Detalle/Detalle";
import Fondo from "../../components/Fondo/Fondo";

export function DetallePersonaje() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // aca si el personaje no existe, lo traemos de la API
  // si existe, lo traemos de la location.state (que es el estado que pasamos desde la pagina de personajes)
  const [personaje, setPersonaje] = useState(location.state?.personaje);
  const [Cargando, setCargando] = useState(!personaje);

  useEffect(() => {
    if (!personaje) {
      getPersonajeID(id)
        .then((data) => {  //el .then es para que cuando se resuelva la promesa, se ejecute la funcion
          setPersonaje(data);
          setCargando(false);
        })
        .catch(() => {
          navigate("/");
        });
    }
  }, [id, personaje, navigate]);

  if (Cargando) {
    return <p className="mt-20 text-center text-xl">Cargando detalles...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <Fondo />
      
      <div className="relative z-10 p-4 mt-10">
        <div className="flex justify-start w-full">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Detalle del Personaje</h1>
        <Detalle personaje={personaje} />
      </div>
    </div>
  );
}
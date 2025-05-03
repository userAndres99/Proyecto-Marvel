import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPersonajeID } from "../../services/getPersonajeID";
import Detalle from "../../components/Detalle/Detalle";

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
        .then((data) => {
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle del Personaje</h1>
      <Detalle personaje={personaje} />
    </div>
  );
}
/**
 * Obtiene un personaje filtrando por nombre(para el buscador).
 * Se hace una consulta a la API usando el parámetro "nombre".
 * Retorna el primer resultado (o null si no se encuentra ninguno).
 * 
 * @param {string} nombre 
 * @returns {Object}
 */
export async function getPersonajeNombre(nombre) {
  const url = `https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes?nombre=${encodeURIComponent(nombre)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

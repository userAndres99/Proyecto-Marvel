/**
 * Funcion para obtener informacion de personajes "heroe" o "villano" desde MockAPI
 * @param {boolean} isHeroe - Indica si se desean héroes (true) o villanos (false)
 * @param {number} page - Numero de pagina (predeterminado: 1)
 * @param {number} limit - Cantidad que se muestra por pagina (predeterminado: 9)
 * @returns {Array} Array de objetos con la información de los personajes
 */
export async function getInformacion(isHeroe, page = 1, limit = 9) {
  try {
    const respuesta = await fetch(
      `https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes?heroe=${isHeroe}&page=${page}&limit=${limit}`
    );
    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }
    const informacion = await respuesta.json();
    return informacion;
  } catch (error) {
    console.error("Error al obtener la información:", error);
    throw error;
  }
}
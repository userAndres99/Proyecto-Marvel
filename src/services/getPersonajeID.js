/**
 * Función para obtener un personaje por su ID desde la API (para el detalle del personaje).
 *  
 * @param {string} id - ID del personaje a buscar(en este caso es string porque mockAPI toma al id como string).
 * @returns {Object} 
 */
export async function getPersonajeID(id) {
    try {
      const response = await fetch(
        `https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes/${id}`
      );
      if (!response.ok) {
        throw new Error("No se encontró el personaje");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el personaje por ID:", error);
      throw error;
    }
}
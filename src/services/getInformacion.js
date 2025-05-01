/**
 * Función para obtener información de personajes "heroe" o "villano" desde mockapi
 * isHeroe: true para héroes, false para villanos
 * @param {boolean} isHeroe - Indica si se desean héroes(true) o villanos(false)
 * @returns {Array} Array de objetos con la información de los personajes
 */
export async function getInformacion(isHeroe) {
  try {
    const respuesta = await fetch(`https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes?heroe=${isHeroe}`);
    if (!respuesta.ok) {   // El .ok verifica si la respuesta HTTP fue exitosa.... Si falla lanzamos un error
      throw new Error(`Error en la solicitud: ${respuesta.status}`);   //throw para lanzar el error
    }
    const informacion = await respuesta.json();
    return informacion;
  } catch (error) {
    console.error("Error al obtener la información:", error);
    throw error; //lo mismo throw para lanzar el error de forma intencional
  }
}


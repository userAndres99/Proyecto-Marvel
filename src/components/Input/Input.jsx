/**
 * Este componente es un input personalizado con Tailwind CSS.
 * @param {string} name - Nombre del input.
 * @param {string} value - Valor del input.
 * @param {function} onChange - Función que se ejecuta cuando cambia el valor del input.
 * @param {string} type - Tipo de input (text, email, password, etc).
 * @param {string} placeholder - Texto que aparece en el input cuando está vacío.
 */
const Input = ({ name, value, onChange, type = "text", placeholder }) => {
  return (
    <input
      name={name}
      id={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="w-full md:w-[75%] px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
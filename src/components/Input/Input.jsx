import styles from "./Input.module.css";
/**
 * este componente es un input 
 * @param {name} name es el nombre del input
 * @param {value} value es el valor del input
 * @param {onChange} onChange es la funcion que se ejecuta cuando cambia el valor del input
 * @param {type} type es el tipo de input (text, email, password, etc)
 * @param {placeholder} placeholder es el texto que aparece en el input cuando esta vacio
 */
const Input = ({ name, value, onChange, type = "text", placeholder }) => {
  return (
    <input
      className={styles.input}
      name={name}
      id={name}
      type={type}
      value={value}
      placeholder={placeholder} 
      onChange={(event) => onChange(event.target.value)} 
    />
  );
};

export default Input;
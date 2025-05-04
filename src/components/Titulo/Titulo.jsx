const Titulo = ({ texto, clase }) => {
  return (
    <h1 className={`${clase} font-semibold text-gray-200`}>{texto}</h1>
  );
};

export default Titulo;
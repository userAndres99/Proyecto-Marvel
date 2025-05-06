const Titulo = ({ texto, clase }) => {
  return (
    <div className="px-4 py-1 bg-black/70 backdrop-blur-md rounded-lg inline-block">
      <h1 className={`${clase} font-bold text-white`}>{texto}</h1>
    </div>
  );
};

export default Titulo;
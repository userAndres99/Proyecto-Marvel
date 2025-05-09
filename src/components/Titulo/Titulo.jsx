const Titulo = ({ texto, clase }) => {
  return (
    <div className="pb-10 inline-block">
      <h1 className={`${clase} px-4 sm:px-8 md:px-12 py-2 sm:py-4 bg-black/70 backdrop-blur-md rounded-lg font-bold text-white`}>
        {texto}
      </h1>
    </div>
  );
};

export default Titulo;
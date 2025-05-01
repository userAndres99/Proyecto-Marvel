// Boton.jsx

const Boton = ({ text, onClick }) => {
    return (
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all duration-200"
        onClick={onClick}>{text}</button>
    );
  };
  
  export default Boton;
  
import styles from './Header.module.css'; 
import Boton from '../Boton/Boton'; 
import Titulo from '../Titulo/Titulo'; 

const Header = () => {
  return (
    <header className={`${styles.header} flex items-center justify-between px-4 py-2 bg-gray-900 text-white`}>
      
      <div className="flex items-center ml-4"> 
        <img
          src="/public/icons-marvel.png" 
          alt="Marvel Logo"
          className="h-16 w-auto mr-4" 
        />
        <Titulo text="Proyecto Marvel" />
      </div>

      <div>
        <Boton text="Favoritos" onClick={() => console.log('Favoritos seleccionados')} />
      </div>
    </header>
  );
};

export default Header;

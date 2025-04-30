import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home/Home'; 

import React, { useEffect, useState } from 'react';

function App() {
  //ESTO LO BORRAMOS DESPUES...ERA PARA HACER PRUEBAS CON LA API
  {/* 
    const [personajes, setPersonajes] = useState([]);
    
      useEffect(() => {
        fetch('https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes')
          .then(res => res.json())
          .then(data => setPersonajes(data))
          .catch(err => console.error('Error al obtener personajes:', err));
      }, []);
    
      return (
        <div>
          <h1>Personajes Marvel</h1>
          <ul>
            {personajes.map(p => (
              <li key={p.id}>
                <img src={p.urlImagen} alt={p.nombre} width={100} />
                <h2>{p.nombre} ({p.alias})</h2>
                <p><strong>Habilidades:</strong> {p.habilidades}</p>
                <p>{p.descripcion}</p>
                <p><strong>Héroe:</strong> {p.heroe ? 'Sí' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>
      );*/}
  return (
    
    <div className="App">
      <Home />
    </div>

  );
}

export default App;


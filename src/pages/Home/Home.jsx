import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
//---importacion de componentes
import Boton from '../../components/Boton/Boton';
//--------------------------------


export default function Home() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <>
     
      <div className="flex h-screen">
        {/* Mitad Heroes */}
        <div
          onMouseEnter={() => setHovered('heroes')}
          onMouseLeave={() => setHovered(null)}
          className="w-1/2 bg-cover bg-center flex items-center justify-end pr-15 transition-all duration-300"
          style={{
            backgroundImage: "url('/heroes.jpg')",
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
            filter: hovered === 'villanos' ? 'blur(3px)' : 'none',
          }}
        >
          <Boton
            text="Héroes"
            onClick={() => navigate('/personajes?heroe=true')} 
          />
        </div>

        {/* Mitad Villanos */}
        <div
          onMouseEnter={() => setHovered('villanos')}
          onMouseLeave={() => setHovered(null)}
          className="w-1/2 bg-cover bg-center flex items-center justify-start pl-15 transition-all duration-300"
          style={{
            backgroundImage: "url('/villanos.webp')",
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            filter: hovered === 'heroes' ? 'blur(3px)' : 'none',
          }}
        >
          <Boton
            text="Villanos"
            onClick={() => navigate('/personajes?heroe=false')} 
          />
        </div>
      </div>

    </>
  );
}

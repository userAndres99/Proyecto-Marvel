/*detalle*/
import React, { useDebugValue, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export  function DetallePersonaje() {

const location = useLocation();
const {id} = useParams();
const navigate = useNavigate()

const [personaje, setPersonaje] = useState(location.state?.personaje)
const [loading, setLoading] = useState(!personaje);


useEffect(()=>{
    if(!personaje){
        fetch(`https://6810fac427f2fdac24138f1f.mockapi.io/api/v1/personajes/${id}`)
        .then (res => {
            if (!res.ok) throw new Error('No encontrado');
            return res.json();
        })
        .then (data =>{
            setPersonaje(data);
            setLoading(false);
        })
        .catch(() => navigate('/'))
    }
}, [id, personaje, navigate])


if(loading) return <p>Cargando detalles...</p>

  return (
    <>
    <div className='p-4'>
    <h1 className='text-2xl font-bold mb-4'>Detalle del Personaje</h1>
    {personaje ? (
       < div className="max-w-md mx-auto border rounded p-4 shadow"> 
       
       <img src={personaje.urlImagen} alt={personaje.nombre} className='w-full h-64 object-cover mb-4 rounded'>
       </img>
       <p className='text-xl font-semibold mb-2'>Nombre: {personaje.nombre}</p>
       <p className='text-xl font-semibold mb-2'>Alias: {personaje.alias}</p>
       <p className='text-xl font-semibold mb-2'>Habilidades: {personaje.habilidades}</p>
       <p className='text-xl font-semibold mb-2'>Descripción: {personaje.descripcion}</p>
       <p className='text-xl font-semibold mb-2'>ID: {personaje.id}</p>
       

       
       </div>
    ):(
        <p>No se han recibidos datos del personaje</p>
    )}



    </div>
      
    </>
  )
}

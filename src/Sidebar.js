import React from 'react';

const Sidebar = ({ graficaSeleccionada, setGraficaSeleccionada }) => {

    return (
        <div className='bg-white w-1/5 h-screen text-gray-500 px-4 py-2 rounded-r-xl block fixed'>
            <p className='text-start text-4xl relative'>Invernadero</p>
            <p className='text-lg'>Bienvenido al dashboard</p>
            <hr className='bg-black h-0.5 my-2' />
            <ul className='space-y-16'>
                <li className={`text-xl content-center h-14 font-bold hover:bg-blue-500 hover:text-white pl-2 p-1 rounded-md cursor-pointer mt-12 ${graficaSeleccionada === 'inicio'
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'animate-none'
                }`}
                    onClick={() => setGraficaSeleccionada('inicio')}>
                    Inicio
                </li>
                <li className={`text-xl content-center h-14 font-bold hover:bg-blue-500 hover:text-white pl-2 p-1 rounded-md cursor-pointer mt-12 ${graficaSeleccionada === 'temperatura'
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'animate-none'
                }`}
                    onClick={() => setGraficaSeleccionada('temperatura')}>
                    Temperatura
                </li>
                <li className={`text-xl content-center h-14 font-bold hover:bg-blue-500 hover:text-white pl-2 p-1 rounded-md cursor-pointer mt-12 ${graficaSeleccionada === 'humedad'
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'animate-none'
                }`}
                    onClick={() => setGraficaSeleccionada('humedad')}>
                    Humedad
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

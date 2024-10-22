import React, { useState } from 'react';
import Sidebar from '../Sidebar';
//? Pages
import Index from './Index';
import Humidity from './Humidity';
import Temperature from './Temperature'

const Dashboard = () => {
    // Estado para manejar qué gráfica mostrar
    const [graficaSeleccionada, setGraficaSeleccionada] = useState('inicio');

    return (
        <div className='flex'>
            {/* Sidebar siempre visible */}
            <Sidebar
                graficaSeleccionada={graficaSeleccionada}
                setGraficaSeleccionada={setGraficaSeleccionada} />
            
            {/* Área de contenido principal */}
            <div className='bg-transparent w-4/5 h-auto min-h-screen text-gray-500 px-6 py-2 rounded-sm relative justify-start items-start overflow-auto ml-[20%] mt-2 mb-2'>
                <div className='grid grid-cols-1 gap-4'>
                    {/* //?Renderizado condicional según la gráfica seleccionada */}
                    {graficaSeleccionada === 'inicio' && <Index />}
                    {graficaSeleccionada === 'temperatura' && <Temperature />}
                    {graficaSeleccionada === 'humedad' && <Humidity />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
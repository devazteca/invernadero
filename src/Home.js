import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Para redirigir al usuario

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Asegúrate de que estos valores sean correctos
            });
    
            const data = await response.json();
    
            if (response.ok) {
                navigate('./Dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <a href="https://www.facebook.com/cetis161tala/">
                    <img
                        aria-hidden
                        src="images/Logo.png"
                        alt="Logo"
                        width={180}
                        height={180}
                        className="dark rounded-sm mb-10 mx-16"
                    />
                </a>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Iniciar Sesión</h2>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Muestra el error */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Ingrese su usuario'
                        required
                        className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Ingrese su contraseña'
                        required
                        className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 rounded-lg text-white font-bold py-2 hover:bg-blue-600 transition duration-200"
                >
                    Iniciar Sesión
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta? <Link to="/Register" className="text-blue-500 hover:underline">Regístrate</Link>
                </p>
            </form>
        </div>
    );
}

export default Home;

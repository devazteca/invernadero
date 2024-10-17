import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpiar el mensaje de error antes de la solicitud
        setError('');

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    phone: number,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registro exitoso, redirigir al usuario
                console.log('Usuario registrado exitosamente', data);
                navigate('/');
            } else {
                // Mostrar el mensaje de error devuelto por el servidor
                setError(data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud', error);
            setError('Ocurrió un error. Inténtelo de nuevo.');
        }
    };

    return (
        <div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
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
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">
                    Registrarse
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Ingrese un nombre de usuario'
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
                        placeholder='Ingrese una contraseña'
                        required
                        className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="number">
                        Número de teléfono
                    </label>
                    <input
                        type="number"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder='Ingrese su número de teléfono'
                        required
                        className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 rounded-lg text-white font-bold py-2 hover:bg-blue-600 transition duration-200"
                >
                    Registrarse
                </button>

                {/* Mostrar el mensaje de error si existe */}
                {error && (
                    <p className="mt-4 text-center text-red-500">
                        {error}
                    </p>
                )}

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta? <Link to="/" className="text-blue-500 hover:underline">Inicia Sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;

const express = require('express');
const cors = require('cors');
const postgres = require('postgres');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 5000;

// Configura CORS para permitir solicitudes desde localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Permite el acceso desde el frontend
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Si necesitas usar cookies o sesiones
}));

app.use(express.json()); // Para manejar solicitudes con cuerpo en formato JSON

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Si la conexión necesita SSL
    },
});

//? Inicia sesión
app.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    console.log('Datos recibidos:', username, password); // Para depurar y verificar que se reciban correctamente

    try {
        // Buscar el usuario en la base de datos por el nombre de usuario
        const result = await sql`SELECT * FROM users WHERE username = ${username}`;
        
        // Verificar si el usuario existe
        if (result.length > 0) {
            const user = result[0]; // Obtener el usuario encontrado
            const passwordMatch = await bcrypt.compare(password, user.pass); // Comparar la contraseña

            if (passwordMatch) {
                // Si las contraseñas coinciden, enviar una respuesta de éxito
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                // Si las contraseñas no coinciden, enviar un mensaje de error
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            // Si no se encuentra el usuario, enviar un mensaje de error
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

//? Registra un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password, phone } = req.body;

    try {
        // Verificar si el nombre de usuario ya existe
        const checkUserResult = await sql`SELECT * FROM users WHERE username = ${username}`;

        if (checkUserResult.length > 0) {
            // Si ya existe un usuario con ese nombre, devolver un error específico
            return res.status(400).json({ message: 'El usuario ya existe, intente con otro.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        await sql`INSERT INTO users (username, pass, phone) VALUES (${username}, ${hashedPassword}, ${phone})`;

        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const postgres = require('postgres');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Configura CORS
app.use(cors());
app.use(express.json());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await sql`SELECT * FROM users WHERE username = ${username}`;
        
        if (result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.pass);
            if (passwordMatch) {
                return res.status(200).json({ message: 'Inicio de sesión exitoso' });
            }
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        return res.status(401).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
});

// Manejar el registro
app.post('/register', async (req, res) => {
    const { username, password, phone } = req.body;

    try {
        const checkUserResult = await sql`SELECT * FROM users WHERE username = ${username}`;
        if (checkUserResult.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe, intente con otro.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`INSERT INTO users (username, pass, phone) VALUES (${username}, ${hashedPassword}, ${phone})`;

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Exportar la función de manejo de solicitudes
module.exports = app;

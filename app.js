const express = require('express');
const cors = require('cors');
const postgres = require('postgres');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//TODO: Configura CORS para permitir solicitudes desde localhost:3000
app.use(cors({
    origin: 'https://invernadero-alpha.vercel.app', //TODO: Permite el acceso desde el frontend
    methods: ['GET', 'POST'], //TODO: Métodos permitidos
    credentials: true, //TODO: Si necesitas usar cookies o sesiones
}));

app.use(express.json()); //TODO: Para manejar solicitudes con cuerpo en formato JSON

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false, //TODO: Si la conexión necesita SSL
    },
});

//TODO: Ruta base para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

//TODO: Inicia sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', username, password); //TODO: Para depurar y verificar que se reciban correctamente
    try {
        //TODO: Buscar el usuario en la base de datos por el nombre de usuario
        const result = await sql`SELECT * FROM users WHERE username = ${username}`;
        //TODO: Verificar si el usuario existe
        if (result.length > 0) {
            const user = result[0]; //TODO: Obtener el usuario encontrado
            const passwordMatch = await bcrypt.compare(password, user.pass); //TODO: Comparar la contraseña
            if (passwordMatch) {
                //TODO: Si las contraseñas coinciden, enviar una respuesta de éxito
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                //TODO: Si las contraseñas no coinciden, enviar un mensaje de error
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            //TODO: Si no se encuentra el usuario, enviar un mensaje de error
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

//TODO: Registra un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password, phone } = req.body;
    try {
        //TODO: Verificar si el nombre de usuario ya existe
        const checkUserResult = await sql`SELECT * FROM users WHERE username = ${username}`;
        if (checkUserResult.length > 0) {
            //TODO: Si ya existe un usuario con ese nombre, devolver un error específico
            return res.status(400).json({ message: 'El usuario ya existe, intente con otro.' });
        }
        //TODO: Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        //TODO: Insertar nuevo usuario en la base de datos
        await sql`INSERT INTO users (username, pass, phone) VALUES (${username}, ${hashedPassword}, ${phone})`;
        //TODO: Respuesta exitosa
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

//TODO: Endpoint para recibir datos del ESP32
app.post('/api/sensordata', async (req, res) => {
    const { sensorValueH, sensorValueT } = req.body;
    try {
        //TODO: Inserta el valor del sensor en la tabla 'sensor_data'
        await sql`INSERT INTO humidity_data (humidity) VALUES (${sensorValueH})`;
        await sql`INSERT INTO temperature_data (temperature) VALUES (${sensorValueT})`;
        res.status(200).send('Datos insertados correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar los datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto: ${port}`);
});

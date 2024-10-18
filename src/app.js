// Importa Express y Axios
const express = require('express');
const axios = require('axios');
const appRouter = require('./routes/index')
// Crear la app con Express
const app = express();

// Puerto en el que correrá el servidor
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(appRouter)
// Ruta para hacer la petición a la URL del CRM
/*app.get('/crm', async (req, res) => {
    try {
        const response = await axios.get('https://tera.uy/integracion/json/23.json');
        res.json(response.data);  // Enviar los datos como respuesta JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al hacer la petición', error });
    }
});*/


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

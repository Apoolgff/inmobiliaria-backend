const express = require('express');
const axios = require('axios');
const appRouter = require('./routes/index')
const path = require('path');
const { connectDB, configObject } = require('./config/index')
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

const PORT = 4000;
connectDB()

app.use(cors({ origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(configObject.cookie_secret_key));
app.use(appRouter)

//Ruta para hacer la peticion al CRM
app.get('/crm', async (req, res) => {
    try {
        const response = await axios.get('https://tera.uy/integracion/json/23.json');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al hacer la petición', error });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

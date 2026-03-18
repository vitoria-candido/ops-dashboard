const express = require('express');
const cors = require('cors');
require('./database/db');

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.use('/tickets', ticketRoutes);

module.exports = app;
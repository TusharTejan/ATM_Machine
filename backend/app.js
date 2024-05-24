const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const atmRoutes = require('./routes/atm');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/atm', atmRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

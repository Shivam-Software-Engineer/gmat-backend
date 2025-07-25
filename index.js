const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { website } = require('./App/routes/website'); // ✅ Adjust path as per your structure

const app = express();
app.use(cors());
app.use(express.json());

app.use('/website', website); // ✅ Mount /website

// const PORT = 8000;
app.listen(process.env.PORT);


//http://localhost:8000/
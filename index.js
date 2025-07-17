const express = require('express');
const cors = require('cors');
const { website } = require('./App/routes/website'); // ✅ Adjust path as per your structure

const app = express();
app.use(cors());
app.use(express.json());

app.use('/website', website); // ✅ Mount /website

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


//http://localhost:8000/
const express = require('express');
const routes = require('./src/routes/index');
const cors = require('cors');
const functions = require('firebase-functions');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());



app.use('/api', routes);



// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
exports.app = functions.https.onRequest(app);
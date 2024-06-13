const express = require('express');
const courseRoutes = require('./src/routes/courseRoutes');
const projectRoutes = require('./src/routes/projectRoutes')
const toolRoutes = require('./src/routes/toolRoutes')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/api', courseRoutes);
app.use('/api', projectRoutes);
app.use('/api', toolRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
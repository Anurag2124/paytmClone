const express = require("express");
const rootRouter = require('./routes/index');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1',rootRouter)
app.listen(3000, () => console.log('Server listening on port 3000'))
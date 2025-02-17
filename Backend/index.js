const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
// const MainRouter = require('./routes/index');

// app.use('api/v1', MainRouter);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
const connectToMongo = require('./db');
const express = require('express');
connectToMongo();
const app = express();
const port = 5000;

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})
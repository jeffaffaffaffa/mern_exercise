const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //using mongoose to create schemas (under models folder)
//for CRUD operations from routes folder
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
//use environment variable if it is available, otherwise default to port 5000
//in terminal, the command 'export PORT=5000' (set on windows) sets the port to 5000
const port = process.send.PORT || 5000;

//using cors allows web app to use things from different sources
app.use(cors());
app.use(express.json()); //allows server to use json

//connect to mongodb
const uri = process.env.ATLAS_URI;
//need to create environmet variable. this is done by creating a .env file and setting ATLAS_URI to the connection string.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
//display message if connected
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

//use router files
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
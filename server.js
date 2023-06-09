const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:8888"
}));

const PORT = 9992;

app.listen(PORT, () => {
    console.log("Server started");
});

//mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect("mongodb://172.17.0.2/mydb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to DB");
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error);
    });

app.use(express.json());
app.use(routes);

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

mongoose.connect('mongodb+srv://dione_apps:Dione&169@cluster0.5yxff.mongodb.net/4pic1word?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected established"))
    .catch(err => console.log("DB connection error: ", err));

app.use(morgan("dev"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", require("./routes/User"));
app.use("/package", require("./routes/Package"));
app.use("/level", require("./routes/Level"));
app.use("/", require("./routes/home"));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
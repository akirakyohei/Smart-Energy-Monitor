const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./configs/db.config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger.config');
const open = require('open');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
app.use(connectLiveReload());

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

// 
mongoose.connect(
    db.url,
    (err) => {
        if (err) return console.log("error", err);
        console.log("MongoDB connection --Ready state is:", mongoose.connection.readyState);
    }
)

// 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 
app.get('/', function(req, res) {
    res.send('Hello world!');
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
    console.log(`http://localhost:${PORT}/docs`);
})



// open(`http://localhost:${PORT}/docs`);
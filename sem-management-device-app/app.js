const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./configs/db.config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger.config');
const ibmService = require('./services/ibm.service');
const AmqpService = require('./services/rabbitmq.server.rpc.service');
const kue = require('kue');
// const livereload = require('livereload');
// const connectLiveReload = require('connect-livereload');



const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });

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


ibmService.connect();
ibmService.handleDeviceEvents();
ibmService.handleDeviceStatusEvents();
ibmService.processAddMeter();

// 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(kue.app);
// 


// var data = {
//     deviceId: '619f5ac83bde5359dd798552'
// }
// ibmService.getDiagnosticLog(data);

const PORT = process.env.PORT || 8081;

AmqpService.connectAmqpServer();

app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
    console.log(`http://localhost:${PORT}/docs`);
});
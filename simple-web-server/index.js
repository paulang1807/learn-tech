'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const router = express.Router();
const router = require('./router');

app.use('/api/widgets', bodyParser.json());
app.use('/api/widgets', router);
app.use(express.static('client'));

const server = http.createServer(app);

server.listen(3000, err => {
    if (err) {
        console.log(err.message);
    }

    console.log('web server started on port 3000');
})
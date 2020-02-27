'use strict';

const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('client'));

const server = http.createServer(app);

server.listen(3000, err => {
    if (err) {
        console.log(err.message);
    }

    console.log('web server started on port 3000');
})
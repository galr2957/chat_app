const express = require('express');

const config = require('./config/app.js')

const router = require('./router')

const bodyparser = require('body-parser')

const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true}))

const port = config.app_port;

app.use(router);

app.listen(port , () => {
    console.log(`listening on ${port} port`)
})
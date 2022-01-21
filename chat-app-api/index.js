const express = require('express');

const config = require('./config/app.js')

const router = require('./router')

const bodyparser = require('body-parser')

const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true}))

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.app_port;

app.use(router);

app.listen(port , () => {
    console.log(`listening on ${port} port`)
})
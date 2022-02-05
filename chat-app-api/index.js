const express = require('express');
const config = require('./config/app.js')
const router = require('./router')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express();
const http = require('http')

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))
app.use(router);


const port = config.app_port;

const server = http.createServer(app)
const SocketServer = require('./socket')
SocketServer(server)



server.listen(port , () => {
    console.log(`listening on ${port} port`)
    console.log(` on ${config.app_url} port`)
})
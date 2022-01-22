
const socketIo = require('socket.io')

const users = new Map()

const SocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        }
      });

    io.on('connection', (socket) => {
        socket.on('join', async(user) => {

            let sockets = []

            if (users.has(user.id)) { 
                const existingUser = users.get(user.id)
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
                users.set(user.id, existingUser)
                sockets = [...existingUser.sockets, ...[socket.id]]
            }else {
                users.set(users.id, {id: user.id, sockets: [socket.id]})
            }
            console.log("new user joined:" , user.firstName);

            io.to(socket.id).emit('typing', 'user typing...')
        })
    })
}

module.exports = SocketServer
const io = require('socket.io')(8000, {cors: {origin: "*"}});


const users ={}

io.on('connection', socket =>{
    socket.on('new-user-join',Name=>{
        users[socket.id]=Name;
        socket.broadcast.emit('user-join',Name);
    })
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })


    socket.on('disconnect',message => {
        socket.broadcast.emit('leve',users[socket.id])
        delete users[socket.id]
    })
})



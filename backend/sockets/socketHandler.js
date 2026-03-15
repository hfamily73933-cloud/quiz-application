const connectedUsers = new Map();

const socketHandler = (io)=>{

  io.on("connection",(socket)=>{

    console.log("User connected:",socket.id);

    socket.on("registerUser",(userId)=>{

      connectedUsers.set(userId,socket.id);

    });

    socket.on("disconnect",()=>{

      console.log("User disconnected:",socket.id);

      for(const [userId,socketId] of connectedUsers.entries()){

        if(socketId === socket.id){
          connectedUsers.delete(userId);
        }

      }

    });

  });

};

module.exports = socketHandler;
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

// =========================
const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3000/'],
  },
});

let playerArray = [];
io.on('connection', (socket) => {
  const myId = socket.id;
  console.log(`My ID: ${myId}`)
  console.log('player connected');
  const room = socket.handshake.query.room;
  console.log(room);
  socket.join(room);
  //this is an ES6 Set of all client ids in the room
  const clients = io.sockets.adapter.rooms.get(room);

  //to get the number of clients in this room
  const numClients = clients ? clients.size : 0;
  console.log(numClients);


  if (numClients == 1) {
    console.log("I AM PLAYER ONE");
    io.in(socket.id).emit("whatPlayerAmI", numClients);
  } else if (numClients == 2) {
    console.log("I AM PLAYER TWO");
    io.in(socket.id).emit("whatPlayerAmI", numClients);
  } else {
    console.log("I AM A SPECTATOR");
    io.in(socket.id).emit("whatPlayerAmI", "spectator");
  }

  playerArray.push(myId);
  if (playerArray.includes(myId)) {
    let playerId = playerArray.findIndex((item, i) => {
      if (item === myId) {
        io.to(room).emit('playerJoined', i);
      }
    });

  }
  socket.on('sendMessage', (message) => {
    console.log("message sent");
    io.in(room).emit("getMessage", message);
  });

  socket.on('changePlayerTurn', (turnNumber) => {
    // console.log(playerTurn);
    io.in(room).emit("newPlayerTurn", turnNumber);
  });

  socket.on('player1Move', (locationP1X) => {
    console.log(locationP1X);
    io.in(room).emit("player1Position", locationP1X);
  });
  socket.on('player2Move', (locationP2X) => {
    console.log(locationP2X);
    io.in(room).emit("player2Position", locationP2X);
  });



  socket.on('disconnect', () => {
    console.log('player disconnected');
    if (playerArray.includes(myId)) {
      let deleteId = playerArray.findIndex((item, i) => {
        if (item === myId) {
          playerArray.splice(i, 1);
          console.log(playerArray);
        }
      });

    }

  });
});


http.listen(3002, () => {
  console.log('server listening on localhost:3002');
});
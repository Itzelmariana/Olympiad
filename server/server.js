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

// MY STUFF
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
const server2 = http.createServer(app);

// Set up the body-parser object to handle JSON-encoded payloads.
var bodyParser = require("body-parser")
app.use(bodyParser.json());

// Handle the /move HTTP POST endpoint.
app.post('/move', function (req, res) {
  var responseObj = { ok: true, x: req.body.x, y: req.body.y };
  var response = JSON.stringify(responseObj);
  console.log(response);
  res.send(response);

  // Notify connected WebSockets of new position data by emitting a "move" event.
  if (req.body.x && req.body.y) {

  }
});

const io = new Server(server2, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  // console.log(`user connected: ${socket.id}`);
  let roomNum = socket.id;
  console.log(socket.id)
  socket.join(roomNum);
  io.to(roomNum).emit("connectToRoom", roomNum);

  // //Send this event to everyone in the room.
  // io.sockets.in(roomNum).emit('connectToRoom', roomNum);

  socket.on("move", (data) => {
    console.log("server side signal capture");
    console.log(` what the hell ${roomNum}`)
    io.sockets.in(roomNum).emit("move");
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
  });

});


server2.listen(3002, () => {
  console.log('Socket.io is running on 3002!');
})
// ===========

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

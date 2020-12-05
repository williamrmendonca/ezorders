const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const router = require('./routes');

//informar link de conexao
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(cors());
app.use(express.json());
app.use(router);

server.listen(process.env.PORT || 3001, () => console.log(`🔥 Server started at port:${process.env.PORT || 3001}`));

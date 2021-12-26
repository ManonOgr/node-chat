const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 1337;

app.set("view engine", "pug");
app.set("views", "./src/views");

app.locals.pretty = true;

require('./chat-serveur')(io);

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.static("./src/static"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chat", (req, res) => {
  if (!req.query.pseudo) {
    return res.redirect("/");
  }

  const pseudo = req.query.pseudo;

  res.render("chat", { pseudo });
});

server.listen(PORT, function () {
  console.log(`Le serveur écoute sur http://localhost:${PORT}`);
});

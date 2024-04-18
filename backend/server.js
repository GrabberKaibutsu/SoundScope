require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const db = require("./models");

const liveReloadServer = livereload.createServer();

const artistController = require("./controllers/artistController");
const reviewRoutes = require("./controllers/reviewController");
const musicdbRoutes = require("./controllers/musicController");
const albumRoutes = require("./controllers/albumController");

liveReloadServer.watch(path.join(__dirname, "../public"));

app.use(connectLiveReload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/artists", artistController);
app.use("/albums", albumRoutes);
app.use("/reviews", reviewRoutes);
app.use("/music", musicdbRoutes);

// Basic route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to MusicDB!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

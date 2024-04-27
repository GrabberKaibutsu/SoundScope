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

// const liveReloadServer = livereload.createServer();

//Import routes from the controllers
const artistController = require("./controllers/artistController");
const musicdbRoutes = require("./controllers/musicController");
const albumRoutes = require("./controllers/albumController");
const reviewRoutes = require("./controllers/reviewController");
const searchRoutes = require("./controllers/searchController");
const userRouter = require("./controllers/userController");
const homeRouter = require("./controllers/homeController");

// liveReloadServer.watch(path.join(__dirname, "../public"));

// app.use(connectLiveReload());
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

// Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.options("*", cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/artists", artistController);
app.use("/api", musicdbRoutes);
app.use("/albums", albumRoutes);
app.use("/reviews", reviewRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRouter);
app.use("/home", homeRouter);

// Basic route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to MusicDB!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

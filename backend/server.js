// DEPENDENCIES ---
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// FILES ---
const connectDB = require("./config/db");
const routes = require("./routes/projectRoute");
const data = require("./data/data");

// VARIABLES & FUNCTIONS ---
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// ROUTES ---
app.use("/", routes);
app.use("/:id", routes);
app.get("/test/data", (req, res) => {
  res.json(data);
});

// DEPLOYMENT --------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// DEPLOYMENT --------------

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

const express = require("express");
import {Request, Response} from "express";
const mongoose = require("mongoose");
require("dotenv").config();
// console.log("process.env.MONGO_URI:", process.env.MONGO_URI);
const cors = require("cors");
import path from "path";

const router: void = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error: string) => console.log({error}));

// Routes
// app.use(router);
// app.use("/auth", require("./routes/index"));
app.use("/auth", router);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  // Get anything, load index.html file
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT: number = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// console.log("process.env.MONGO_URI:", process.env.MONGO_URI);
const cors = require("cors");

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

const PORT: number = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

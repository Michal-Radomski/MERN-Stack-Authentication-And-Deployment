const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// console.log("process.env.MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error: string) => console.log({error}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

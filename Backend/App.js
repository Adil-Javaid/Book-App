require("dotenv").config();
require("./Database/connection")
const cors = require("cors");
const express = require("express");
const setupGoogleAuth = require("./auth/googleAuth");

const BookRouter = require("./Routes/BookRouter")
const NewBookRouter = require('./Routes/NewBookRouter')
const SellBookRouter = require('./Routes/SellBookRouter')
const app = express();
const PORT = process.env.PORT || 6005;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

setupGoogleAuth(app);

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to the Book App!");
});

app.use("/api/books", BookRouter);
app.use('/api/new-books', NewBookRouter)
app.use("/api/pending-books", SellBookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const port = 2700;

app.use(express.json());

app.get("/ping", (req, res) => {
  try {
    res.status(201).json({ message: "pong" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "User Service is running" });
});

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/TodoRoutes");
const { CheckConnection } = require("./utils/conn");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
  origin: "https://santhoshkmern.netlify.app",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
CheckConnection();
app.use(userRoutes);
app.use(todoRoutes);

app.listen(5000, () => {
  console.log("Server Started");
});

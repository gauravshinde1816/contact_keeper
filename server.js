const express = require("express");
const connectDB = require("./config/db");
const app = express();

///conenect Database
connectDB();
app.get("/", (req, res) => {
  res.send("Home page");
});

//Init middleware
app.use(express.json({ extended: true }));

//Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));

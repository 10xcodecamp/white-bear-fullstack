const express = require("express");
const app = express();

// Routes
app.use("/api/v1/users", require("./api/v1/users"));
app.get("/", (req, res) => res.send("Hello World!"));

// Port
const port = process.env.PORT || 3045;
app.listen(port, () => console.log(`Server running on port: ${port} \n`));

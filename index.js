const express = require("express");
const app = express();
const cors = require("cors");
const vcfRoutes = require("./routes/vcfRoutes");

app.use(express.json());
// app.use(express.bodyParser({limit: '100mb'}));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use("/api", vcfRoutes);
const port = 6001;


app.listen(port, () => console.log(`server is running on port ${port}`))
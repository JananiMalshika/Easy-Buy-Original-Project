const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
const upload = require("./utils/multer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Database Connection URL
const URL = process.env.DB_URL;

//Check the database connection
mongoose.connect(URL)
.then(() => console.log("Database connect successfully!"))
.catch((err) => console.log(err));

app.use("/items", upload.single('image'), require('./Routes/Deborah/itemRoutes')) 
app.use("/client", require("./Routes/Thivanka/apiRoutes")); 
    app.use("/user",  require("./Routes/Janani/apiRoutes")
); 

//port Number Assign
const port = process.env.port || 8000;

//Display the working port
app.listen(port,()=>{
    console.log(`Server is up and running port: ${port}`)
})
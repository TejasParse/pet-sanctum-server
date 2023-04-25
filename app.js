require("dotenv").config()

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require('morgan');
const fs = require("fs")

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const petRoutes = require("./routes/petRoutes");
const connectDb = require("./config/db");
const swaggerJSDoc = require("swagger-jsdoc");
connectDb();

const PORT = process.env.PORT || 3000;


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pet Sanctum API",
            version: "1.0.0",
            description: "An API for serving Pet Sanctum Project"
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis:  ["./routes/*.js"]
};

const specs = swaggerJSDoc(options)

app.use("/public", express.static("public"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/pet", petRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


const accessLogStream = fs.createWriteStream('.\\logs\\access.log', {flags:'a'});
accessLogStream.on('error', (err) => {
  console.error(`Error while writing to access.log file: ${err}`);
});

app.use(morgan('combined', { stream: accessLogStream }));

app.get("*", (req,res)=>{

    res.status(404).json({
        status: "404",
        message: "Page not found! Version 3"
    });
});

module.exports = app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`);
});
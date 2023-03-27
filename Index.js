const express= require("Express");
const cors= require("cors")
const app= express();
const dotenv=require("dotenv");
const connectToDb = require("./Db");

app.get("/",(req,res)=>{
    res.status(200).send("Hello from app");
})

//cors fix
app.use(cors());

//express.json to data transferr
app.use(express.json())

//Dotenv to use enviroment variables
dotenv.config()

//Connecting with database(mongo)
connectToDb()

app.use("/books",require("./Routes/Books"))

app.listen(80,()=>{
    // console.log("App is working");
})
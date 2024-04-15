const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const port = 8800;
dotenv.config();
const multer = require("multer");
const path = require("path");

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");


const connectDB = async(options={})=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,options)
        console.log("Connection to Database is successfully established")

        mongoose.connection.on("error",(error)=>{
            console.error("Db connection error:",error);
        })
    } catch (error) {
        console.error("Data base is not connected",error.toString())
    }
}

//middleware system/build
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images",express.static(path.join(__dirname,"public/images")))

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
        cb(null, 'public/images');
  },
  filename:  (req, file, cb)=> {
      cb(null, req.body.name);
  }
})

const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try { 
        return res.status(200).json("File uploaded successfully")
    } catch (error) {
        console.log(error);
    }
});

//Middleware for use
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
    connectDB()
});
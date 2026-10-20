 
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/connectDb.js";
// import userRouter from "./routes/user.route.js";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from 'cookie-parser'
// import helmet from 'helmet'

// dotenv.config();
// connectDB();// may be delete this from gpt

// const app = express();
// app.options('*',cors())

// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));
// app.use(cookieParser())
//  app.use(helmet({
//   crossOriginResourcePolicy:false
//  }))
// app.use("/api/users", userRouter); 

// app.get("/", (req, res) => {
//   // server to client
//   // res.send("API is running...");
//   res.json({
//     message:"API is running..." + process.env.PORT
//   });
// });

// // const PORT = process.env.PORT || 8000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// connectDB().then(()=>{
//   app.listen(process.env.PORT,()=>{
//     console.log('server is running',process.env.PORT);
//   })
// })



import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDb.js";
import userRouter from "./routes/userRoutes.js"; // make sure this matches your file
import cors from "cors";
import morgan from "morgan";

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running on port " + process.env.PORT });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

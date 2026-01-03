const express=require('express');
const cors=require('cors')

const authRoutes=require("./routes/authRoutes");
const taskRoutes=require("./routes/taskRoutes")
const log = require("./utils/logger");
const app=express();
require("dotenv").config()
app.use(cors({
    origin: `${process.env.FRONTEND_URL} || http://localhost:5173`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// db
const dbConnect=require("./config/db");
dbConnect();

// routes
app.use("/api/auth",authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    log("Server started successfully");
});
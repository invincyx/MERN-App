import express from "express";
import dotenv from "dotenv";
dotenv.config();
import workoutRoutes from './routes/workouts.js';
import mongoose from "mongoose";

// Express app
const app = express();


// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// Routes
app.use("/api/workouts",workoutRoutes);


// Connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
// Listen for requests
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})
})
.catch((error)=>{
    console.log(error)
})


import WorkoutModel from "../models/WorkoutModel.js";
import mongoose from "mongoose";


// Get all workouts

const getWorkouts =  async(req,res)=>{
    try{
        const allWorkouts = await WorkoutModel.find({}).sort({createdAt: -1})
        res.status(200).json({allWorkouts})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
   
}


// Get a single Workout

const getWorkout = async (req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findById(id)
    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json({workout})
}


// Create a single workout

const createWorkout = async(req,res)=>{
    const { title,load,reps } = req.body
    console.log(req.body)
    try {
        const workout =  await WorkoutModel.create({title,load,reps})
        console.log(req.title)
        res.status(200).json({workout})

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}



// Delete a workout
const deleteWorkout = async (req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findByIdAndDelete({_id: id})
    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }
    res.status(200).json({workout})
}


// Update a workout
const updateWorkout = async(req, res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findByIdAndUpdate({_id: id}, {...req.body})
    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }
    res.status(200).json({workout})
}


export  {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
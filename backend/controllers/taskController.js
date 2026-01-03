const Tasks=require("../models/task");
const log = require("../utils/logger");


// create task
const createTask=async(req,res)=>{
    try {
        const {title,description}=req.body;
        if(!title)
            return res.status(400).json({message:"Title is required"});

        const task=await Tasks.create({
            title,description,user:req.user,
        })
        res.status(201).json(task);
        log(`Task created by user ${req.user}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// fetch all task
const getTasks=async(req,res)=>{
    try {
        const {search,status}=req.query;
        let query={user:req.user};

        if(search)
        {
            query.title={$regex:search, $options:"i"};

        }
        if(status)
        {
            query.status=status;
        }
        const tasks=await Tasks.find(query).sort({
            createdAt:-1,
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update task
const updateTasks=async (req, res) => {
  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined)
      task.description = req.body.description;

    if (req.body.status && ["pending", "completed"].includes(req.body.status)) {
      task.status = req.body.status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
    log(`Task updated: ${req.params.id}`);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// delete task
const deleteTasks=async(req,res)=>{
    try {
        const task=await Tasks.findOneAndDelete({
            _id:req.params.id,
            user:req.user
        });
        if(!task)
            return res.status(404).json({message:"Task not existed"});
        res.json({message:"Task deleted Successfully"});
        log(`Task deleted: ${req.params.id}`);

    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

module.exports={
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}

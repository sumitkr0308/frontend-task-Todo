const express=require("express");
const taskController=require("../controllers/taskController");
const auth=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/",auth,taskController.createTask);
router.get("/",auth,taskController.getTasks);
router.put("/:id",auth,taskController.updateTasks);
router.delete("/:id",auth,taskController.deleteTasks);

module.exports=router;

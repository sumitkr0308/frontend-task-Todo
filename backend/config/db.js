const mongoose = require('mongoose');

const DbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB is Connected");
        
    } catch (error) {
        console.error(error.message);
        process.exit(1); 
    }
}

module.exports=DbConnect;
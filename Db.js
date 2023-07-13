const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const connectDb = async()=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo Connected Successfully!');
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = connectDb
    
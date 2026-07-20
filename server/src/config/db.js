import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo Connected");
    } catch (error) {
        console.log("error in mongoDB",error);
    }
}

export default connectDB;
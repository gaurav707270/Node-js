import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.MONGO_DB_URL)

        console.log("mongo db connected successfully")

    } catch (error) {
        console.log(error)
        console.log("mongo db connecation failed")
    }
}


export default connectDB
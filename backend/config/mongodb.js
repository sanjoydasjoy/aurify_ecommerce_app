import mongoose from "mongoose"

const connectDB = async () =>{
    const mongoUrl = process.env.mongodb_url
    if (!mongoUrl) {
        throw new Error("Missing mongodb_url environment variable")
    }

    const normalizedMongoUrl = String(mongoUrl).replace(/\/+$/, "")

    mongoose.connection.on('connected',()=>{
        console.log("DB connected");
        
    })

    mongoose.connection.on('error', (error) => {
        console.error("MongoDB connection error:", error.message)
    })

    await mongoose.connect(`${normalizedMongoUrl}/e-commerce`)
}

export default connectDB
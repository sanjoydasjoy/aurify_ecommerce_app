import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import aiRouter from './routes/aiRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
let dbReady = false
let cloudinaryReady = false

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Promise Rejection:', reason)
})

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
})

connectDB()
    .then(() => {
        dbReady = true
    })
    .catch((error) => {
        console.error('Failed to connect MongoDB:', error.message)
    })

Promise.resolve(connectCloudinary())
    .then(() => {
        cloudinaryReady = true
    })
    .catch((error) => {
        console.error('Failed to configure Cloudinary:', error.message)
    })

//middlewares

app.use(express.json())
app.use(cors())

// api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/ai',aiRouter)

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'aurify-backend',
        dbReady,
        cloudinaryReady,
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
    })
})

app.get('/favicon.ico', (req, res) => {
    res.status(204).end()
})

app.listen(port,()=> console.log(`Server is listening from port ${port}`)) 
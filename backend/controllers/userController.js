import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const getJwtSecret = () => process.env.JWT_SECRET || process.env.jwt_secret

const createToken = (id) => {
    return jwt.sign({ id }, getJwtSecret())
}


// route for user login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = bcrypt.compareSync(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credintials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exist or not

        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password with more than 8 characters" })
        }

        // before storing the user in the database, we need to hash the password and store the hashed password. and for this we will use bycrypt password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        // when the user will be created, one _id property will be generated, using this _id we will generate a token. for this we will be creating one arrow function
        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// route for admin login

const adminLogin = async (req, res) => {
    try{
        const {email,password} = req.body
        if(email === process.env.admin_email && password === process.env.admin_password){
            const token = jwt.sign({ role: "admin", email }, getJwtSecret())
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message:"Invalid Credential"})
        }
    } catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// route for fetching logged in user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId).select("name email")

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const [totalOrders, spendSummary, userOrders] = await Promise.all([
            orderModel.countDocuments({ userId, payment: true }),
            orderModel.aggregate([
                { $match: { userId, payment: true } },
                { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
            ]),
            orderModel
            .find({ userId, payment: true })
            .sort({ date: -1 })
            .limit(5)
            .lean(),
        ])

        const totalSpent = Number(spendSummary?.[0]?.totalSpent || 0)
        const memberSince = user._id.getTimestamp()
        const lastOrderDate = userOrders[0]?.date ? new Date(userOrders[0].date) : null

        const recentOrders = userOrders.map((order) => ({
            id: order._id,
            amount: order.amount,
            status: order.status,
            paymentMethod: order.paymentMethod,
            date: order.date,
            itemCount: Array.isArray(order.items) ? order.items.length : 0,
        }))

        res.json({
            success: true,
            user,
            stats: {
                totalOrders,
                totalSpent,
                memberSince,
                lastOrderDate,
            },
            recentOrders,
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile }
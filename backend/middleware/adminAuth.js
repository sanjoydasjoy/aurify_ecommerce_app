// for admin authentication we will be using this middleware

import jwt from 'jsonwebtoken'

const getJwtSecret = () => process.env.JWT_SECRET || process.env.jwt_secret

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })

        }
        const token_decode = jwt.verify(token, getJwtSecret())
        if (token_decode?.role !== "admin" || token_decode?.email !== process.env.admin_email) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default adminAuth
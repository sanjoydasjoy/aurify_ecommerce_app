// for admin authentication we will be using this middleware

import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })

        }
        const token_decode = jwt.verify(token, process.env.jwt_secret)
        if (token_decode !== process.env.admin_email + process.env.admin_password) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default adminAuth
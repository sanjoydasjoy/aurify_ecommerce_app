import jwt from 'jsonwebtoken'

const getJwtSecret = () => process.env.JWT_SECRET || process.env.jwt_secret

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })

    }

    try {

        const token_decode = jwt.verify(token, getJwtSecret())
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
        
    }
}

export default authUser
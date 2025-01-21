import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async ()=>{

    cloudinary.config({
        cloud_name: process.env.cloudinary_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_secret_key,
    })

}

export default connectCloudinary

import multer from 'multer'

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

// we have to name this storage otherwise this middleware wont work

export default upload
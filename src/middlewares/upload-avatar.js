const multer = require ('multer');

const storage = multer.diskStorage({
    destination: './public/imageAnomaly',
    filename: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
            return cb(new Error('File must be image'));
        }
        return cb(null, true);
    },
   
});
const uploadAvatar = upload.single('image');
module.exports=  storage ;
module.exports= uploadAvatar;
//export const uploadAvatars = upload.array('avatar');
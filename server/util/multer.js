const multer = require('multer');


//uploads category img
const multerStorageCategory = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadSingleFile = multer({ storage: multerStorageCategory }).fields([{ name: 'image', maxCount: 1 }])




module.exports = {
     uploadSingleFile
}
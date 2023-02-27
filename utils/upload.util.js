const multer = require("multer");
const {v4: uuid} = require("uuid");

const upload = multer({
    fileFilter: (req, {mimetype}, cb) => {
        cb(null, mimetype === 'image/jpeg' || mimetype === 'image/png')
    },
    storage:  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,  __dirname + '/../media/tmp/')
        },
        filename: function (req, file, cb) {
            const {1: fileType} = file.originalname.split('.')
            const filename = uuid() + "." + fileType
            cb(null, filename)
        }
    })
})

const middlewareUploadImages = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'logoMarque', maxCount: 1 }])

module.exports = {
    middlewareUploadImages
}
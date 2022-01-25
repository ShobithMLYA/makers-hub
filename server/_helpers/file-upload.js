const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '../client/src/uploads/speakers',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|png|jpg|jpeg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

module.exports = uploadImage;
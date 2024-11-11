const fs = require('fs');
const multer = require('multer');
const path = require('path');


const dest = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(dest, {recursive: true});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extention = path.extname(file.originalname);
        const filename = uniqueSuffix + extention;
        cb(null, filename);
    },
}); 

const upload = multer({ storage });

module.exports = upload;
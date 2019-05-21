const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
            cb(error, 'app/images/');
        }
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const name = file.fieldname;
        const ext = MIME_TYPE_MAP[file.mimetype];
        if (ext != undefined) {
            cb(null, name + '.' + ext);
        } else if (fileExt) {
            cb(null, name + '.' + fileExt);
        }
    }
});

module.exports = multer({ storage: storage }).fields([{ name: 'image' }]);
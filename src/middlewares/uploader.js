const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, 'users/' + Date.now().toString() + '-' + file.originalname);
        }
    })
})

module.exports = upload;
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
    cb(null, file.originalname)
    }
  }),
  // limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
})

const remove = (key) => {
  s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }, function(err, data){})
}
 
module.exports = { upload, remove }
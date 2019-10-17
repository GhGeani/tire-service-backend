const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');

const s3 = new aws.S3({
  S3_KEY: process.env.S3_KEY,
  S3_SECRET: process.env.S3_SECRET,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tireshopimages',
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
    Bucket: 'tireshopimages',
    Key: key
  }, function(err, data){})
}
 
module.exports = { upload, remove }
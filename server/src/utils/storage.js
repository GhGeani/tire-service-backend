const aws = require( 'aws-sdk' );
const multerS3 = require('multer-sharp-s3');
const multer = require('multer');

const sharp = require('sharp');


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = function(width, height) {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      key: function (req, file, cb) {
        cb(null, file.originalname)
      },
      resize: {
        width,
        height
      }
    })
  }).any()
} 

const remove = (key) => {
  s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }, function(err, data){})
}
 
module.exports = { upload, remove }
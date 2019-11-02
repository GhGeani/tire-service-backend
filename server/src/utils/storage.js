const AWS = require( 'aws-sdk' );
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = function(width, height) {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,

      key: function (req, file, cb) {
        cb(null, file.originalname)
      },

      shouldTransform: function(req, file, cb) {
        cb(null, /^image/i.test(file.mimetype));
      },

      transforms: [{
        transform: function(req, file, cb) {
          //Perform desired transformations
          cb(
            null,
            sharp()
              .resize(width, height)
              .max()
          );
        }
      }],
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
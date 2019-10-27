const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
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
     
      shouldTransform: function (req, file, cb) {
        cb(null, /^image/i.test(file.mimetype))
      },
      transforms: [{
        id: 'original',
        key: function (req, file, cb) {
          cb(null, file.originalname)
        },
        transform: function (req, file, cb) {
          cb(null, sharp()
          .resize(width, height)
          .composite([{ input: file.originalname, gravity: 'southeast' }])
          )
        }
      }]
    }),
  }).any()
} 

const remove = (key) => {
  s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }, function(err, data){})
}
 
module.exports = { upload, remove }
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');

const s3 = new aws.S3({
  accessKeyId: 'AKIAJVT5YZY2VTW6FCPQ',
  secretAccessKey: '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',
  Bucket: 'tireshopimages'
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
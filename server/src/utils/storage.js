const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../core/config/configs')

const isProd = process.env.NODE_ENV === 'production'
cloudinary.config({
  cloud_name: isProd ? process.env.CLOUD_NAME: config.cloud.CLOUD_NAME,
  api_key: isProd ? process.env.API_KEY : config.cloud.API_KEY,
  api_secret: isProd ? process.env.API_SECRET: config.cloud.API_SECRET
})


const upload =  (width, height) => {
  return multer({storage: getStorage(width, height)}).any();
}

function getStorage(width, height) {
  return cloudinaryStorage({
    cloudinary,
    folder: isProd ? process.env.CLOUD_FOLDER : config.cloud.CLOUD_FOLDER,
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', ],
    transformation: [{ width, height, crop: 'limit' }],
    filename: function (req, file, cb) {
      cb(undefined, file.originalname);
    }
  })
}

const remove = (key) => {
  cloudinary.uploader.destroy(key, function(error) { console.log(error) });
};


module.exports = { upload, remove };
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'demsdreams',
  api_key: process.env.API_KEY || '117631267167635',
  api_secret: process.env.API_SECRET || 'c3b7QHsGzMpelRX3vd48-AF8Fxw'
})

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'tireshop',
  filename: function (req, file, cb) {
    cb(undefined, file.originalname);
  }
});

const upload =  multer({ storage }).any() 

const remove = (key) => {
  return cloudinary.uploader.destroy(key, function(result) { console.log(result) });
};


module.exports = { upload, remove };
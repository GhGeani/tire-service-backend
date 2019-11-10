const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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
  console.log(cloudinary);
  // return cloudinary.uploader.destroy(key, function(error) { console.log(errors) });
};


module.exports = { upload, remove };
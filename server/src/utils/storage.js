const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const upload =  (file) => {
  console.log(file)
  return cloudinary.uploader.upload(file, function(error, result) {console.log(result, error)});
}

const remove = (key) => {
  console.log(cloudinary);
  return cloudinary.uploader.destroy(key, function(error) { console.log(errors) });
};


module.exports = { upload, remove };
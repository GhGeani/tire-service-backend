const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const upload =  (width, height) => {
  return multer({storage: getStorage(width, height)}).any();
}

function getStorage(width, height) {
  return cloudinaryStorage({
    cloudinary,
    folder: 'tireshop',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', ],
    transformation: [{ width, height, crop: 'limit' }]
  })
}

const remove = (key) => {
  console.log(cloudinary);
  cloudinary.uploader.destroy(key, function(error) { console.log(errors) });
};


module.exports = { upload, remove };
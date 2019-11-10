const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const upload =  (file) => {
  console.log(file)
  // return cloudinary.uploader.upload(file, function(error, result) {console.log(result, error)});
  cloudinary.uploader.upload(file, {
    public_id: file.originalname
  }, function(error, result) {
    console.log(result);
  });

}

const remove = (key) => {
  console.log(cloudinary);
  cloudinary.uploader.destroy(key, function(error) { console.log(errors) });
};


module.exports = { upload, remove };
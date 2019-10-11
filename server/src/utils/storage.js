const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, done) {
    done(null, path.join(__dirname , '../../../public/uploads'));
  },
  filename: function(req, file, done) {
    done(null,  file.originalname);
  },
});


module.exports = multer({ storage });
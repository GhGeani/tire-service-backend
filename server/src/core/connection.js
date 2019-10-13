require('dotenv').config();

module.exports = connect = (mongoose, config) => {
  let url = `mongodb://localhost:27017/${config.database.dbname}`
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'prod') {
    url = process.env.DB_URI;
  }
  mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
   console.log(`Connected to Database -> ${url}`);
  });
}
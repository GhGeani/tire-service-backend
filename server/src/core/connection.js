
module.exports = connect = (mongoose, config) => {
  let url = `mongodb://localhost:27017/${config.database.dbname}`
  if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)
    url = 'mongodb+srv://admin:Robert7771@vulc-bascov-udrx1.mongodb.net/test?retryWrites=true&w=majority';
  }
  mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
   console.log(`Connected to Database -> ${url}`);
  });
}
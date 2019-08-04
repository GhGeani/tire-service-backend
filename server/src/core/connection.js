module.exports = connect = (mongoose, config) => {
   mongoose.connect(`mongodb://localhost:27017/${config.database.dbname}`,{ useNewUrlParser: true }, (err) => {
   if (err) console.log(err);
   console.log(`Connected to Database -> ${config.database.dbname}`);
 });
}
const mongoose = require('mongoose');
const db = mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
  console.log("Connected to MongoDB Atlas");
}).catch((err)=>{
  console.log('Error connecting to MongoDB Atlas:', err);
});

module.exports = db;

const mongoose = require('mongoose')

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(function () {
      console.log('MongoDB Atlas CONECTADO!')
    })
    .catch(function (err) {
      console.log(err.message)
    })
}

module.exports = connectToDb

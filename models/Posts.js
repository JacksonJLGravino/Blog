var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema(
  {
    titulo: String,
    conteudo: String,
    views: Number,
    slug: String
  },
  { collection: 'posts' }
)

var loginSchema = new Schema(
  {
    login: String,
    senha: String
  },
  { collection: 'login' }
)

var Posts = mongoose.model('Posts', postSchema)
var Login = mongoose.model('Login', loginSchema)

module.exports = { Posts, Login }

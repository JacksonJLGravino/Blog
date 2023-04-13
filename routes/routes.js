const routes = require('express').Router()
const PostController = require('../controller/PostController')

routes.get('/', PostController.getPosts)
routes.get('/article/:slug', PostController.readPost)
routes.post('/admin/cadastro', PostController.creatPost)

module.exports = routes

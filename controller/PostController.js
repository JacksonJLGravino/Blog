const { Posts } = require('../models/Posts')

const getPosts = (req, res) => {
  Posts.find({})
    .sort({ _id: -1 })
    .then(asidePost => {
      if (req.query.busca == null) {
        Posts.find({})
          .sort({ _id: -1 })
          .limit(6)
          .then(posts => {
            posts = posts.map(val => {
              return {
                titulo: val.titulo,
                conteudo: val.conteudo.substring(0, 200),
                slug: val.slug
              }
            })
            res.render('index', { posts: posts, asidePost: asidePost })
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        Posts.find({ titulo: { $regex: req.query.busca, $options: 'i' } })
          .then(posts => {
            posts = posts.map(val => {
              return {
                titulo: val.titulo,
                conteudo: val.conteudo.substring(0, 200),
                slug: val.slug
              }
            })
            res.render('busca', {
              posts: posts,
              contagem: posts.length,
              asidePost: asidePost,
              busca: req.query.busca
            })
          })
          .catch(err => {
            console.log(err.message)
          })
      }
    })
    .catch(err => {
      console.log(err.message)
    })
}

const readPost = (req, res) => {
  Posts.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
  )
    .then(post => {
      res.render('article', { noticia: post })
    })
    .catch(err => {
      console.log(err.message)
    })
}

const creatPost = (req, res) => {
  Posts.create({
    titulo: req.body.titulo_noticia,
    conteudo: req.body.noticia,
    views: 0,
    slug: req.body.slug
  })

  res.redirect('/admin/login')
}

module.exports = {
  getPosts,
  readPost,
  creatPost
}

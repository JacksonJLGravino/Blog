require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

const routes = require('./routes/routes')
const connectToDb = require('./database/db')
const { Posts, Login } = require('./models/Posts')

connectToDb()
const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
  })
)

app.post('/admin/login', (req, res) => {
  Login.find({
    login: { $regex: req.body.login, $options: 'i' }
  }).then(log => {
    if (log[0].senha == req.body.senha) {
      req.session.login = 'MeuBLogSession'
    }
    res.redirect('/admin/login')
  })
})

app.get('/admin/login', (req, res) => {
  if (req.session.login == null) {
    res.render('adminLogin')
  } else {
    Posts.find({})
      .sort({ _id: -1 })
      .then(posts => {
        res.render('adminPainel', { posts: posts })
      })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodnado em http://localhost:${port}`)
})

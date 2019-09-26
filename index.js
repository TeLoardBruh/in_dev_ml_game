const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, './')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/app.ejs', (req, res) => res.render('app'))
  .get('/web-cam.ejs', (req, res) => res.render('web-cam'))
  .get('/train-db.ejs', (req, res) => res.render('train-db'))
  .get('/trained-regress.ejs', (req, res) => res.render('trained-regress'))
  .get('/save-load.ejs', (req, res) => res.render('save-load'))
  .get('/knn.ejs', (req, res) => res.render('knn'))
  .get('/knn-model.ejs', (req, res) => res.render('knn-model'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

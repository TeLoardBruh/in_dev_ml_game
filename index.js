const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000 || process.env.PORT;




app.set("view engine", "ejs");

// here to add js into ejs
app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => res.render('index'));

app.get('/app.ejs', (req, res) => res.render('app'));

app.get('/web-cam.ejs', (req, res) => res.render('web-cam'));

app.get('/train-db.ejs', (req, res) => res.render('train-db'));

app.get('/trained-regress.ejs', (req, res) => res.render('trained-regress'));

app.get('/save-load.ejs', (req, res) => res.render('save-load'));

app.get('/knn.ejs', (req, res) => res.render('knn'));

app.get('/knn-model.ejs', (req, res) => res.render('knn-model'));


// app.get('/web-cam.ejs', (req, res) => res.render('web-cam'));

// ========================================
app.listen(PORT,()=>console.log(`Server up and running ${PORT}`));
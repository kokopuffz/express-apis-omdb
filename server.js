require('dotenv').config();
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 8000

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
// app.get('/', function(req, res) {
//   res.send('Hello, backend!');
// });


//main start page
app.get('/', (req,res)=>{
  res.render('index.ejs')
})

app.get("/results", (req, res) => {
  console.log(req.query.search);
  const url = `http://www.omdbapi.com/?t=${req.query.search}&plot=full&apikey=${process.env.OMDB_API_KEY}`;
  console.log(url);
  axios.get(url).then((response) => {
    const searchResults = response.data;
    console.log(searchResults);
    res.render("results.ejs", { result: searchResults });
    // if (!searchResults.response){
    //   res.send('movie does not exist, try again')
    // }
  });
});



// app.get('/detail', (req,res) => {

// }) 

// app.use('/results', require('./controllers/moviesController.js'))

app.use('/movies', require('./controllers/moviesController.js'))
// The app.listen function returns a server handle
// var server = app.listen(process32.env.PORT || 8000);
app.listen(PORT, err =>{
  if (err) console.log(err)
  console.log(`listening to port ${PORT}. r we there yet?`)
})

// We can export this server to other servers like this
// module.exports = server;

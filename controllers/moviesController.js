const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get("/:movieid", (req, res) => {
  console.log(req.params);
  const url = `http://www.omdbapi.com/?i=${req.params.movieid}&plot=full&apikey=${process.env.OMDB_API_KEY}`;
  console.log(url);

  axios.get(url)
  .then((response) => {
    const searchResults = response.data;
    console.log(searchResults);
    res.render("detail.ejs", { result: searchResults });
  });
});

module.exports = router
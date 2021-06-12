var express = require('express');
var router = express.Router();

const moviesBL = require('../BLL/moviesBL');
/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.authenticated) {
    res.render('menuPage', {});
  }
  else {
    res.redirect("/")
  }
});
router.get('/editUsers', function (req, res, next) {
  if (req.session.authenticated) {

    res.redirect('/users')
    // res.render('editUsers', {});

  }
  else {
    res.redirect("/")
  }
});


router.get('/addMovies', function (req, res, next) {
  if (req.session.authenticated) {
    res.render('addMovie', {});
  }
  else {
    res.redirect("/")
  }
});


router.get('/addMovies/add', function (req, res, next) {
  if (req.session.authenticated) {
    //if the saving is going well
    res.render('menu', {});
  }
  else {
    res.redirect("/")
  }
});

router.get('/search', async function (req, res, next) {
  if (req.session.authenticated) {
    try {
      let movies = await moviesBL.getAllMovies()
      console.log("Movies : " + movies);
      res.render('search', { movies });
    }
    catch (err) {
      console.log("error with movies :" + err);
      res.redirect("/menu")

      // res.render('search', {});
    }
  }
  else {
    console.log("movies no authenticate ");
    res.redirect("/")
  }
});





module.exports = router;

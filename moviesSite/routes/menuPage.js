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
    //add the last id to create id +1
    res.render('addMovie', {});
  }
  else {
    res.redirect("/")
  }
});


router.post('/addMovies/add', async function (req, res, next) {
  if (req.session.authenticated) {

    console.log("add Name movie : " + req.body.nameM)
    try {
      let result = await moviesBL.addMovie(req.body)
      console.log("result from controller " + result)
      res.redirect("/menu")
    }
    catch (err) { 
      console.log("err from controller " + err)
      res.render('addMovie', {err})
    }
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
    }
  }
  else {
    console.log("movies no authenticate ");
    res.redirect("/")
  }
});





module.exports = router;

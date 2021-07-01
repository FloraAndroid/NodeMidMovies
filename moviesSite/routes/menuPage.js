var express = require('express');
var router = express.Router();

const moviesBL = require('../BLL/moviesBL');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log("menu router redirect");
  console.log("Authenticated menu", req.session)
  if ((req.session.authenticated) || (res?.session?.authenticated)) {

    try {
      let movies = await moviesBL.getRestMovies()
      console.log("is admin", req.session.user.admin)
      res.render('menuPage', { "isAdmin": req.session.user.admin });

    } catch (err) {
      console.log("err in menu")

      res.render('menuPage', {});

    }
  }
  else {
    res.redirect("/")
  }
});
router.get('/editUsers', function (req, res, next) {
  if (req.session.authenticated) {
    res.redirect('/users')
  }
  else {
    res.redirect("/")
  }
});


router.get('/addMovies', function (req, res, next) {
  if (checkAllownace(req.session)) {
    res.render('addMovie', {});
  }
  else {
    res.redirect('/transaction/' + req.session.transaction)
  }
});


router.post('/addMovies/add', async function (req, res, next) {
  // if (req.session.authenticated) {
  if (checkAllownace(req.session)) {

    //// req.session["authenticated"] = true;
    //req.session.save

    console.log("add Name movie : ", req.body.nameM)
    try {
      let result = await moviesBL.addMovie(req.body)
      console.log("result from controller " + result)
      req.session["transaction"] = req.session.transaction + 1

      res.redirect("/menu")
    }
    catch (err) {
      console.log("err from controller " + err)
      res.render('addMovie', { err })
    }
  }
  else {
    res.redirect('/transaction/' + req.session.transaction)
  }
});

router.post('/searchMovies/search', async function (req, res, next) {
  console.log("Search Movies Params : ", req.body)

  // if (req.session.authenticated) {
  if (checkAllownace(req.session)) {

    try {
      let movies = await moviesBL.searchMovie(req.body);
      // console.log("Movies ",  movies);
      req.session["searchParam"] = req.body
      req.session["transaction"] = req.session.transaction + 1

      res.render('searchResult', { movies });
    }
    catch (err) {
      //  console.log("error with movies :" + err);
      res.redirect("/menu")
    }

  } else {
    res.redirect('/transaction/' + req.session.transaction)
    // res.redirect("/?trans="+req.session.transaction)
  }
});

router.get('/searchMovies/search', async function (req, res, next) {
  //  if (req.session.authenticated) {
  if (checkAllownace(req.session)) {

    console.log("back from details");
    //   res.send("hello")

    let movies = await moviesBL.searchMovie(req.session.searchParam);


   // let movies=req.session.movies;
    res.render('searchResult', { movies });

    //res.redirect('back');
    //res.redirect('back');

    //  res.prev;
    //  req.session.redirectTo = '/searchMovies/search';
  }
  else {
    res.redirect('/transaction/' + req.session.transaction)
  }

});
router.get('/searchMovies/search/:id/', async function (req, res, next) {
  // if (req.session.authenticated) {
  if (checkAllownace(req.session)) {
    console.log("Search Movies Params : ", req.params.id)
    let mov = await moviesBL.getMovieById(req.params.id);
    req.session["transaction"] = req.session.transaction + 1

    res.render('movieDataPage', { mov })
  } else {
    res.redirect('/transaction/' + req.session.transaction)

  }


});
router.get('/searchMovies', async function (req, res, next) {
  // if (req.session.authenticated) {
  if (checkAllownace(req.session)) {

    res.render('searchInput', {});
  }
  else {
    console.log("movies no authenticate ");
    res.redirect('/transaction/' + req.session.transaction)
  }
});



function checkAllownace(session) {
  let userTrans = Number.isInteger(session.user.numOfTrans) ? session.user.numOfTrans : 0;
  console.log("num ofTrans of user", userTrans)
  console.log("num ofTrans of user", session.transaction)

  if (session.user.admin && session.authenticated) {
    return true
  }
  else {
    if (session.authenticated && userTrans > session.transaction) {

      return true
    }
    return false
  }


}


module.exports = router;

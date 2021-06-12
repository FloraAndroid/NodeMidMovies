var express = require('express');
var router = express.Router();
const usersBL=require('../BLL/usersBL')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{});
});


router.post('/authenticate', async function (req, res, next) {
  let isExit = await usersBL.isUserExist(req.body.username, req.body.pwd);
  console.log("isExist authenticate :" + isExit);
  if (isExit) {
    req.session["authenticated"] = true;
    console.log("authneticate session : " + req.session);

    res.redirect('/menu');

  }
  else {
    res.render('login', { msg: "Wrong username or password !!" });
  }
});

module.exports = router;


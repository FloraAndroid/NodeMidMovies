var express = require('express');
var router = express.Router();
const usersBL=require('../BLL/usersBL')

/* GET users listing. */



router.post('/authenticate', async function (req, res, next) {
  let user = await usersBL.isUserExist(req.body.username, req.body.pwd);
  console.log("isExist authenticate :" ,user);
  if (user!=false) {
    req.session["authenticated"] = true;
    req.session["transaction"]=0
    req.session["user"]=user
    console.log("authneticate session : " , req.session);
    res.redirect('/menu/');
  }
  else {
    res.render('login', { data: "Wrong username or password !!" });
  }
});

router.get('/', function(req, res, next) {
  res.render('login',{data:""});
});

router.get('/transaction/:trans?', function(req, res, next) {
  let transactionNum = req.params.trans
  console.log("num ofTransaction",transactionNum?transactionNum:0)

  res.render('login',{data:transactionNum?transactionNum+ " Num Of Transactions You have Done, Please Sign In Agian":0});
});


module.exports = router;


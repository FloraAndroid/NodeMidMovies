var express = require('express');
var router = express.Router();
const usersBL = require('../BLL/usersBL');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let users = await usersBL.getAllUsers();

  res.render('usersList', { users });

  // res.send('respond with a resource');
});




router.get('/:nameOfAction/:id?', async function (req, res, next) {
  let nameOfAction = req.params.nameOfAction
  let user = await usersBL.getUserById(req.params.id)
  console.log("user :" + user.userName)
  res.render('userEdit', { data: { "nameOfAction": req.params.nameOfAction, "user": user } });
});


router.post('/:nameOfAction/save/:id?', async function (req, res, next) {

  let nameOfAction = req.params.nameOfAction;

  if (nameOfAction == "Add") {
    let result = await usersBL.addUSer(req.body)
    console.log(result)
  }
  if (nameOfAction == "update") {
    console.log("update  user " + req.params.id)
    let result = await usersBL.updateUser(req.body, req.params.id)
    console.log(result)
  }

  if (nameOfAction == "delete") {

    let result = await usersBL.deleteUser(req.params.id)
    console.log(result)
  }

  res.redirect("/users")

  // res.render('userEdit', { nameOfAction });

});


function updateUsersFile() {

}
module.exports = router;

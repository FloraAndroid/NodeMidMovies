const jFile = require('jsonfile');


const updateUsersFile = (obj) => {
    let users = { "users": obj }
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/users.json", users, function (err) {

            if (err) {
                reject(err)

            }
            else {
                resolve("succeeded")
            }
        });
    });
}

const getUsers = function () {

    return new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/users.json", function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        });
    });
}

module.exports = { getUsers,updateUsersFile }
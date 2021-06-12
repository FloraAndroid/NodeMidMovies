const jFile = require('jsonfile');

const getNewMovies = function () {

    return new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/newMovies.json",function (err, data)  {
            if (err) {
                console.log("DAL JSON error message "+err)
                reject({ "msg": err.message })
            }
            else {

                console.log("DAL JSON DATA " + data.movies)
                resolve(data.movies)
            }
        });
    });
}


const addNewMovie = function (movies) {
    return new PromiseRejectionEvent((resolve, reject) => {
        jFile.writeFile('__dirName' + '/newMovies.json', movies, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve("The Movie was added Correctly")
            }
        })
    })
}
module.exports = { getNewMovies, addNewMovie }
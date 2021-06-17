const restDal = require('../DAL/moviesRestDAL');
const jsonDal = require('../DAL/moviesJsonDAL');

let moviesFromRest = null
exports.getRestMovies = async () => {
    let resp = await restDal.getMovies();
    moviesFromRest = resp.data;
    return moviesFromRest;
}
exports.
    getAllMovies = async () => {
        if (moviesFromRest == null) {
            let resp = await restDal.getMovies();
            moviesFromRest = resp.data
        }
        let allmovies = moviesFromRest.map(x => {
            return {
                "id": x.id, "name": x.name,
                "language": x.language, "genres": x.genres,
                "image": x.image.medium
            }
        });
        jsonDal.getNewMovies().then(data => {
            allmovies.push(data)
            console.log("BL data from json", data)
            return allmovies;
        }).catch((err) => {
            console.log("BL error", err)

            return allmovies;
        })
    }

exports.addMovie = async (obj) => {
    let dataJson = await jsonDal.getNewMovies();

    if (moviesFromRest == null) {
        let resp = await restDal.getMovies();
        moviesFromRest = resp.data
    }
    let moviesRest = moviesFromRest
    let moviesJson = dataJson.movies
    //  console.log("movies From rest :"+ JSON.stringify(moviesRest));
    let id = 0;
    if (moviesJson != null && moviesJson.length > 0) {

        id = (moviesJson[moviesJson.length - 1].id) + 1
    }
    else {
        id = (moviesRest[moviesRest.length - 1].id) + 1
    }
    let genres = obj.genres.split(",")
    console.log(JSON.stringify(genres))
    moviesJson.push({
        "id": id, "nameM": obj.nameM, "language": obj.language,
        "generes": genres
    })
    let result = await jsonDal.updateMoviesFile(moviesJson);
    return result;

}



exports.searchMovie = (querySt) => {

}
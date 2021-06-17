const restDal = require('../DAL/moviesRestDAL');
const jsonDal = require('../DAL/moviesJsonDAL');

exports.getAllMovies = async () => {
    let resp = await restDal.getMovies();
    let allmovies = resp.data.map(x => {
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
    let moviesJson = []
    let data = await jsonDal.getNewMovies();
    moviesJson = data

    moviesJson.push({
        "id": 99, "nameM": obj.nameM, "language": obj.language,
        "generes": obj.genres
    })
    let result = await jsonDal.updateMoviesFile(moviesJson);
    return result;

    // try {
    //     console.log(result);
    //     return result;

    // }
    // catch (err) {
    //     console.log(err);
    //     return err;

    // }
}



exports.searchMovie = (query) => {

}
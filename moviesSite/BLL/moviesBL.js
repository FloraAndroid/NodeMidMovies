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
        console.log("BL data from json",data)
        return allmovies;
    }).catch((err) => {
        console.log("BL error",err)
 
        return allmovies;
    })
}

exports.addMovie = (movie) => {
    let moviesJson=[]
    jsonDal.getNewMovies().then(data => {
        moviesJson=data
        moviesJson.push(movie)
       
    }).catch((err) => {
        moviesJson.push(movie)
    })
}

exports.searchMovie = (query) => {

}
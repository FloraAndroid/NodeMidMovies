const restDal = require('../DAL/moviesRestDAL');
const jsonDal = require('../DAL/moviesJsonDAL');
const { all, get } = require('../app');

let moviesFromRest = null
exports.getRestMovies = async () => {
    let resp = await restDal.getMovies();
    // moviesFromRest = resp.data;
    moviesFromRest = resp.data.map(x => {
        return {
            "id": x.id, "name": x.name,
            "language": x.language, "genres": x.genres,
            "image": x.image.medium
        }
    });
    return moviesFromRest;
}
exports.
    getAllMovies = async () => {
        if (moviesFromRest == null) {
            let resp = await restDal.getMovies();
            moviesFromRest = resp.data.map(x => {
                return {
                    "id": x.id, "name": x.name,
                    "language": x.language, "genres": x.genres,
                    "image": x.image.medium,
                }
            });
        }
        let allmovies = moviesFromRest;
        //   console.log("movies BL all movies rest", allmovies)
        let moviesFromJson = await jsonDal.getNewMovies();

        allmovies.push(moviesFromJson.movies)
        return allmovies;
    }

exports.addMovie = async (obj) => {
    let dataJson = await jsonDal.getNewMovies();

    if (moviesFromRest == null) {
        let resp = await restDal.getMovies();
        moviesFromRest = resp.data.map(x => {
            return {
                "id": x.id, "name": x.name,
                "language": x.language, "genres": x.genres,
                "image": x.image.medium
            }
        });
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
    //   console.log(JSON.stringify(genres))
    moviesJson.push({
        "id": id, "name": obj.nameM, "image": "", "language": obj.language,
        "genres": genres
    })
    let result = await jsonDal.updateMoviesFile(moviesJson);
    return result;

}



exports.searchMovie = async (queryBody) => {
    let allmovies = await this.getAllMovies();

    // console.log("all movies",allmovies);
    var nameS = queryBody?.nameM ? queryBody.nameM.toLowerCase() : '';
    var languageS = queryBody?.languageM ? queryBody.languageM : '';
    var genreS = queryBody?.genreM ? queryBody.genreM : '';

    console.log("params", nameS);
    console.log("params", languageS);
    console.log("params", genreS);


    let tempMovies = allmovies.filter(x => {

        return ((x.language == languageS || languageS == '') &&
            (x.name.toLowerCase().includes(nameS) || nameS == '') &&
            (x.genres?.includes(genreS) || genreS == '')

        );
    })
    console.log("searchMovies", tempMovies)



    tempMovies.forEach(sm => {
        let related = allmovies.filter(mov => {
            return ((sm.id!=mov.id)&&(
                mov.genres?.filter(gen=>{
                    return( sm.genres.includes(gen));
                })?.length>0)
              
        );
    })
    sm["related"] = related.slice(0, 7);
})

    console.log("searchwith related", tempMovies[0].related)
    return tempMovies;

}

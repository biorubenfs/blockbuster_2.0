const getPeliculas = async () => {

    let page = 1;
    let movies = [];

    while (page < 4) {
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=${page}`;

        let objeto = await fetch(url);
        let response = await objeto.json();

        response.results.forEach(async movie => {
            let date = movie.release_date;
            let genres_ids = movie.genre_ids;
            let year;

            // Formateando la fecha para obtener el año
            if (date !== undefined) {
                year = parseInt(date.substring(0, 4));
            } else {
                year = undefined;
            }

            // Para cada película, recupera su información (solo nos interesa el poster_path de momento)
            let urlMovie = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`;

            let objetoMovie = await fetch(urlMovie);
            let responseMovie = await objetoMovie.json();
            let overview = responseMovie.overview;

            let urlCredits = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`;

            let objetoCredits = await fetch(urlCredits);
            let responseCredits = await objetoCredits.json();
            let cast = responseCredits.cast.slice(0, 10).map(element => element.name);

            // Construimos el objeto tal cual irá en la base de datos
            let movieObject = {
                title: movie.title,
                cast: cast,
                genres_ids: genres_ids,
                year: year,
                poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                overview: overview
            };
            movies.push(movieObject);
        });
        page++;
    }

    console.log(movies);
};

getPeliculas();

const getGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES';

    const objectGenres = await fetch(url);
    const response = await objectGenres.json();

    console.log(response);
};

getGenres();
import Genre from '../models/genre.model.js';

export const formatObject = (e) => {

    /** 
     * This is neccessary in order to transform the mongoose object to plain JS object.
     * Alternatively, you can do .lean() after query, in order to convert the mongoose object
     * to javascript plain objet. In this way you can remove the movie.toJSON() and use the
     * movie object as js regular object.
     * */

    const fmt = e.toJSON();

    delete fmt.__v;
    delete fmt.created_at;
    delete fmt.updated_at;

    return fmt;
};

export const getGenreNames = (idList) => {

    const reference = [
        { id: 28, name: 'Acción' },
        { id: 12, name: 'Aventura' },
        { id: 16, name: 'Animación' },
        { id: 35, name: 'Comedia' },
        { id: 80, name: 'Crimen' },
        { id: 99, name: 'Documental' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Familia' },
        { id: 14, name: 'Fantasía' },
        { id: 36, name: 'Historia' },
        { id: 27, name: 'Terror' },
        { id: 10402, name: 'Música' },
        { id: 9648, name: 'Misterio' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Ciencia ficción' },
        { id: 10770, name: 'Película de TV' },
        { id: 53, name: 'Suspense' },
        { id: 10752, name: 'Bélica' },
        { id: 37, name: 'Western' }
    ];

    const genresNames = reference.filter(ref => idList.includes(ref.id));

    return genresNames;

};
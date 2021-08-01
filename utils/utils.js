export const formatObject = (e) => {

    /** 
     * This is neccessary in order to transform the mongoose object to plant JS object.
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
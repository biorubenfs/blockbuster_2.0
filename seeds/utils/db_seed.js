const environment = (env) => {
    if (env === 'test') {
        console.log(process.env.NAME_DB_TEST);
        return process.env.NAME_DB_TEST;
    }
    console.log(process.env.NAME_DB);
    return process.env.NAME_DB;
};

export default environment;
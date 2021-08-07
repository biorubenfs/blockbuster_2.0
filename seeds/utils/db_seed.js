const environment = (env) => {
    if (env === 'test') {
        return process.env.NAME_DB_TEST;
    }
    return process.env.NAME_DB;
};

export default environment;
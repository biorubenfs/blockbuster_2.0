const formatUser = (user) => {

    // Here que use toJSON, because we didn't use .lean in mongoose query
    const fmt = user.toJSON();

    delete fmt.created_at;
    delete fmt.updated_at;
    delete fmt.__v;

    return fmt;
}

export { formatUser };
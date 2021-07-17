import mongoose from 'mongoose';

const connectDatabase = async (url, port, name) => {
    try {
        const connection = await mongoose.connect(`mongodb://${url}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('mongodb connected');
    } catch (e) {
        console.log(e);
    };
};

export default connectDatabase;
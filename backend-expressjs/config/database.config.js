const {connect, set} = require('mongoose');

ConnectDatabase = async () => {
    try {
        set('strictQuery', false);
        await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
        });
        console.log('Database connect successful.')
    } catch (error) {
        console.error('Database connect failed.', error);
    }
}

module.exports = {ConnectDatabase};

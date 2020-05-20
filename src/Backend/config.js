export const {
    PORT = 8000,
    NODE_ENV = 'development',

    MONGO_URI = 'mongodb+srv://root:admin@cluster0-ynman.gcp.mongodb.net/test?retryWrites=true&w=majority',

    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 2
} = process.env;
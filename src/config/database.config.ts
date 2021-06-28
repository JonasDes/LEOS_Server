import { DatabaseOptions } from "../infrastructure/"

const {
    DB_BASE_URL
} = process.env

export const databaseConfig: DatabaseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    baseurl: DB_BASE_URL ?? 'mongodb://localhost:27017/mylst?retryWrites=true&w=majority',
}
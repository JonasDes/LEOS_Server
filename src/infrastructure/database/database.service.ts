import mongoose from 'mongoose'
import { LoggerService } from '../logger';
import { DatabaseOptions } from './database.options';

export class DatabaseService {
    connection: mongoose.Connection
    constructor(
        protected readonly options: DatabaseOptions,
        protected readonly logger: LoggerService
    ) {
        mongoose.connect(options.baseurl, { ...options })
        this.connection = mongoose.connection;

        this.connection.once("open", () => {
            logger.info("Database | connected")
        });

        this.connection.once("disconnect", () => {
            logger.info("Database | disconnected")
        });
    }


}

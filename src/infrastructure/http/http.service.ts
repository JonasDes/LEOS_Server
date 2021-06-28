import express from 'express';
import cookieParser from 'cookie-parser'
import { json } from 'body-parser';
import cors from 'cors'
import http from 'http'
import { HttpOptions } from './http.options';
import { LoggerService } from '../logger';


export class HttpService {
    public app: express.Application
    public http: http.Server
    constructor(
        protected options: HttpOptions,
        protected logger: LoggerService
    ) {
        this.app = express()
        this.app.use(cookieParser())
        this.app.use(json())
        this.app.use(cors())
        this.app.set("port", options.port);
        this.http = new http.Server(this.app);
        this.http.listen(options.port, () => {
            logger.info("listening on: ", this.http.address());
        });
    }
}


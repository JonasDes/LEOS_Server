import express from 'express';
import cookieParser from 'cookie-parser'
import { json } from 'body-parser';
import cors from 'cors'
import { apiRouter } from './ApiHandler'
import http from 'http'

class ServerHandler {
    public app: express.Application
    public http: http.Server
    constructor() {
        this.app = express()
        this.app.use(cookieParser())
        this.app.use(json())
        this.app.use(cors())
        this.app.use('/api', apiRouter);
        this.app.set("port", process.env.PORT || 3000);
        this.http = new http.Server(this.app);
        this.http.listen(process.env.PORT || 3000, () => {
            console.log("listening on: ", this.http.address());
        });
    }
}

export default ServerHandler

import express, { Router } from 'express'
import { checkAuth } from './auth'

import { authRoute } from './routes/auth'
import { VehicleRoute, SocketService, DiveraService, OperationRoute, UserRoute, StationRoute, Controller, VehicleTypeRoute } from '../'
import { LoggerService } from '../../infrastructure'


export class ApiRouter {
    public router: Router
    constructor(
        protected socket: SocketService,
        protected divera: DiveraService,
        protected controllers: Controller,
        protected logger: LoggerService
    ) {
        this.router = express.Router()
        this.router.use('/auth', authRoute)
        this.router.use('/', checkAuth)

        /*****************
        * ROUTES W AUTH *
        ******************/
        this.router.use('/station', new StationRoute(controllers.stationController).router);
        this.router.use('/vehicle', new VehicleRoute(controllers.vehicleController).router);
        this.router.use('/vehicleType', new VehicleTypeRoute(controllers.vehicleTypeController).router);
        this.router.use('/user', new UserRoute(controllers.userController).router);
        this.router.use('/operation', new OperationRoute(controllers.operationController).router);
    }

}



import { HttpService, LoggerService } from "../../infrastructure";
import { DiveraService, SocketService, ApiRouter } from "../";
import { Controller, VehicleController, StationController, OperationController, VehicleTypeController, UserController, MissionDiaryController } from "./";


export class ControllerService {
    public controllers: Controller
    constructor(
        protected socket: SocketService,
        protected http: HttpService,
        protected divera: DiveraService,
        protected logger: LoggerService
    ) {
        this.controllers = {
            stationController: new StationController(),
            vehicleController: new VehicleController(socket, divera),
            vehicleTypeController: new VehicleTypeController(),
            userController: new UserController(),
            operationController: new OperationController(socket, logger),
            missionDiaryController: new MissionDiaryController()
        }

        http.app.use('/api', new ApiRouter(socket, divera, this.controllers, logger).router)

    }

}
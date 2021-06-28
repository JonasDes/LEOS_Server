
import { OperationController, StationController, UserController, VehicleController, VehicleTypeController } from "./";

export interface Controller {
    vehicleController: VehicleController,
    vehicleTypeController: VehicleTypeController,
    stationController: StationController,
    userController: UserController,
    operationController: OperationController
}

export interface IController {
    create(req: Express.Request, res: Express.Response): Promise<void>;
    list(req: Express.Request, res: Express.Response): Promise<void>;
    list_one(req: Express.Request, res: Express.Response): Promise<void>;
    update(req: Express.Request, res: Express.Response): Promise<void>;
    delete(req: Express.Request, res: Express.Response): Promise<void>;
}


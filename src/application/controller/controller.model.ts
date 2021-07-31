
import { MissionDiaryController } from "..";
import { OperationController, StationController, UserController, VehicleController, VehicleTypeController } from "./";

export interface Controller {
    vehicleController: VehicleController,
    vehicleTypeController: VehicleTypeController,
    stationController: StationController,
    userController: UserController,
    operationController: OperationController
    missionDiaryController: MissionDiaryController
}


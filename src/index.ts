import DiveraHandler from './handlers/DiveraHandler'

import missionDiaryHandler from './handlers/MissionDiaryHandler';
import { DiveraService, SocketService } from './application';
import { DatabaseService, LoggerService, HttpService } from './infrastructure';
import { databaseConfig, diveraConfig, loggerConfig, httpConfig } from './config';
import { ControllerService } from './application/controller/controller.service';
require('dotenv').config()


const logService: LoggerService = new LoggerService(loggerConfig)
const diveraService: DiveraService = new DiveraService(diveraConfig, logService)
const httpService: HttpService = new HttpService(httpConfig, logService)
const socketService: SocketService = new SocketService(httpService.http, logService)
const databaseService: DatabaseService = new DatabaseService(databaseConfig, logService)
const controllerService: ControllerService = new ControllerService(socketService, httpService, diveraService, logService)

//const diveraHandler = new DiveraHandler()



export { diveraService, socketService, httpService, missionDiaryHandler }
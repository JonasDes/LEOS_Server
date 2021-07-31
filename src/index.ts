import { ControllerService, DiveraService, SocketService } from './application';
import { DatabaseService, LoggerService, HttpService } from './infrastructure';
import { databaseConfig, diveraConfig, loggerConfig, httpConfig } from './config';
require('dotenv').config


const logService: LoggerService = new LoggerService(loggerConfig)
const diveraService: DiveraService = new DiveraService(diveraConfig, logService)
const httpService: HttpService = new HttpService(httpConfig, logService)
const socketService: SocketService = new SocketService(httpService.http, logService)
new DatabaseService(databaseConfig, logService)
new ControllerService(socketService, httpService, diveraService, logService)


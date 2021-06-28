
import SocketIO from "socket.io";
import type http from 'http'
import { LoggerService } from "../../infrastructure";

export class SocketService {
    private socket: SocketIO.Server
    constructor(server: http.Server, logger: LoggerService) {
        this.socket = require("socket.io")(server);
        this.socket.on("connection", (socket: SocketIO.Socket) => {
            logger.info("Socket | User connected")
        })
    }

    sendPullFMS() {
        this.socket.emit("pull-fms")
    }
    sendEmergency(vehicle: any) {
        this.socket.emit("NOTFALL", vehicle)
    }
    sendSprechW(vehicle: any) {
        this.socket.emit("sprechw", vehicle, "1", true)
    }
    sendSprechWPrio(vehicle: any) {
        this.socket.emit("sprechw-prio", vehicle, "1", true)
    }

    sendPullOperation() {
        this.socket.emit("pull-operation")
    }
}
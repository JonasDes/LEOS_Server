import SocketIO from "socket.io";
import { VehicleSchema } from "../models/vehicle.model";

class SocketHandler {
    public io: SocketIO.Server
    constructor(http: any) {
        this.io = require("socket.io")(http);
        this.io.on("connection", (socket: SocketIO.Socket) => {
            console.debug("User connected")            
        })
    }

    sendPullFMS() {
        this.io.emit("pull-fms")
    }
    sendEmergency(vehicle: VehicleSchema) {
        this.io.emit("NOTFALL", vehicle)
    }
    sendSprechW(vehicle: VehicleSchema) {
        this.io.emit("sprechw", vehicle, "1", true)
    }
    sendSprechWPrio(vehicle: VehicleSchema) {
        this.io.emit("sprechw-prio", vehicle, "1", true)
    }

    sendPullOperation() {
        this.io.emit("pull-operation")
    }
}

export default SocketHandler

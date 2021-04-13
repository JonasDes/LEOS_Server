"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const VehicleHandler_1 = __importDefault(require("./VehicleHandler"));
class Divera {
    constructor(accesskey) {
        this.accesskey = accesskey;
        try {
            const ioClient = socket_io_client_1.default("https://ws.divera247.com");
            ioClient.on('connect', () => __awaiter(this, void 0, void 0, function* () {
                const jwtRes = yield axios_1.default.get("https://divera247.com/api/v2/auth/jwt?accesskey=" + accesskey);
                const jwt = jwtRes.data.data.jwt;
                ioClient.emit('authenticate', { "jwt": jwt });
                console.log("connected to Divera-Websocket");
            }));
            ioClient.on('cluster-vehicle', (data) => __awaiter(this, void 0, void 0, function* () {
                if (data.vehicle.fmsstatus_id === 10)
                    data.vehicle.fmsstatus_id = 0;
                let vehicle = yield VehicleHandler_1.default.getByDivera(data.vehicle.id);
                if (data.vehicle.fmsstatus_id != vehicle.fms) {
                    VehicleHandler_1.default.updateVehicle(vehicle._id, { fms: data.vehicle.fmsstatus_id });
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }
    sendAlert() {
        console.log("Ich kann noch keine Alarme versenden");
    }
    setVehicleFMS(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post("https://www.divera247.com/api/fms?status_id=" + vehicle.fms + "&vehicle_id=" + vehicle.id + "&accesskey=" + this.accesskey);
        });
    }
    getVehicles() {
        return axios_1.default.get("https://www.divera247.com/api/v2/pull/vehicle-status?accesskey=" + this.accesskey).then(response => response.data.data);
    }
}
exports.default = Divera;
//# sourceMappingURL=Divera.js.map
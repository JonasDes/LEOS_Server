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
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const index_1 = require("../index");
const vehicleHandler = {
    test: () => {
        console.log("TEST");
    },
    getVehicles: () => __awaiter(void 0, void 0, void 0, function* () {
        return vehicle_model_1.default.find().populate('station').populate('type');
    }),
    createVehicle: (vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicle = new vehicle_model_1.default(vehicleData);
            return vehicle.save();
        }
        catch (error) {
            return { "success:": false, "message": error.message };
        }
    }),
    getByDivera: (diveraId) => __awaiter(void 0, void 0, void 0, function* () {
        return vehicle_model_1.default.findOne({ divera_id: diveraId });
    }),
    getById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return vehicle_model_1.default.findOne({ _id: id });
    }),
    getNameById: () => __awaiter(void 0, void 0, void 0, function* () {
    }),
    deleteVehicle: (vehicleID) => __awaiter(void 0, void 0, void 0, function* () {
        const vehicle = yield vehicle_model_1.default.findById(vehicleID);
        return vehicle.delete();
    }),
    updateVehicle: (vehicleID, vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
        let vehicle = yield vehicle_model_1.default.findOne({ _id: vehicleID });
        if (((vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.fms) || (vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.fms) == 0) && (vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.fms) != vehicle.fms) {
            switch (vehicleData.fms) {
                case 0:
                    index_1.ioServer.io.emit("NOTFALL", vehicle);
                    break;
                case 5:
                    index_1.ioServer.io.emit("sprechw", vehicle, "1", true);
                    break;
                case 9:
                    break;
                default:
                    if (vehicle.divera_id)
                        index_1.diveraHandler.setVehicleFMS({ fms: vehicleData.fms, id: vehicle.divera_id });
                    index_1.ioServer.io.emit("pull-fms");
                    return vehicle_model_1.default.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true });
            }
        }
        else {
            index_1.ioServer.io.emit("pull-fms");
            return vehicle_model_1.default.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true });
        }
    }),
};
exports.default = vehicleHandler;
//# sourceMappingURL=VehicleHandler%20copy.js.map
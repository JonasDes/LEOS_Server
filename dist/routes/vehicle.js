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
exports.vehicleRouter = void 0;
const express_1 = __importDefault(require("express"));
const VehicleHandler_1 = __importDefault(require("../handlers/VehicleHandler"));
const router = express_1.default.Router();
exports.vehicleRouter = router;
// READ
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicles = yield VehicleHandler_1.default.getVehicles();
    return res.status(200).send(vehicles);
}));
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield VehicleHandler_1.default.createVehicle(req.body);
        return res.status(200).json(vehicle);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehicle = yield VehicleHandler_1.default.updateVehicle(id, req.body, true);
        return res.status(200).json(vehicle);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehicle = yield VehicleHandler_1.default.deleteVehicle(id);
        res.status(200).send(vehicle);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=vehicle.js.map
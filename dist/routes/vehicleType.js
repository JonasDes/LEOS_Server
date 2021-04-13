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
exports.vehicleTypeRouter = void 0;
const express_1 = __importDefault(require("express"));
const vehicletype_model_1 = __importDefault(require("../models/vehicletype.model"));
const vehicletype_model_2 = __importDefault(require("../models/vehicletype.model"));
const router = express_1.default.Router();
exports.vehicleTypeRouter = router;
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleType = new vehicletype_model_1.default(req.body);
        yield vehicleType.save();
        res.status(200).send(vehicleType);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleType = yield vehicletype_model_1.default.find();
        return res.status(200).send(vehicleType);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehicleType = yield vehicletype_model_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).send(vehicleType);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehicleType = yield vehicletype_model_1.default.findById(id);
        const vehicles = yield vehicletype_model_2.default.find({ station: id });
        if (vehicles.length > 0) {
            if (!req.query.forced) {
                res.status(400).send({ message: "Es sind noch Fahrzeuge verknüpft", vehicles });
                return;
            }
            else {
                yield vehicleType.delete();
                res.status(200).send(vehicleType);
                return;
            }
        }
        yield vehicleType.delete();
        res.status(200).send(vehicleType);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=vehicleType.js.map
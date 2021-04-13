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
exports.missionRouter = void 0;
const express_1 = __importDefault(require("express"));
const mission_model_1 = __importDefault(require("../models/mission.model"));
const router = express_1.default.Router();
exports.missionRouter = router;
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mission = new mission_model_1.default(req.body);
        yield mission.save();
        res.status(200).send(mission);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const missions = yield mission_model_1.default.find();
        return res.status(200).send(missions);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const mission = yield mission_model_1.default.findOne({ _id: id });
        return res.status(200).send(mission);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mission = yield mission_model_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).send(mission);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const mission = yield mission_model_1.default.findById(id);
        yield mission.delete();
        res.status(200).send(mission);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=mission.js.map
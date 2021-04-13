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
exports.diveraRouter = void 0;
const express_1 = __importDefault(require("express"));
const keyword_model_1 = __importDefault(require("../models/keyword.model"));
const index_1 = require("../index");
const router = express_1.default.Router();
exports.diveraRouter = router;
// READ
router.get('/vehicle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield index_1.diveraHandler.getVehicles();
        res.status(200).send(vehicles);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const keyword = yield keyword_model_1.default.findOne({ _id: id }).populate('vehicles', 'name');
        return res.status(200).send(keyword);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const keyword = yield keyword_model_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).send(keyword);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const keyword = yield keyword_model_1.default.findById(id);
        yield keyword.delete();
        res.status(200).send(keyword);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=divera.js.map
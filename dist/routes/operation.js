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
exports.operationRouter = void 0;
const express_1 = __importDefault(require("express"));
const operation_model_1 = __importDefault(require("../models/operation.model"));
const index_1 = require("../index");
const router = express_1.default.Router();
exports.operationRouter = router;
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.timestamp = Date.now();
        req.body.operation.editor = req.headers.user;
        req.body.operation.mission = "602ac22c8bb6c947a06a4106";
        req.body.operation.timestamp = Date.now();
        const operation = new operation_model_1.default(req.body.operation);
        yield operation.save();
        index_1.ioServer.io.emit("pull-operation");
        res.status(200).send(operation);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}));
// READ
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operations = yield operation_model_1.default.find().populate('vehicles', 'name').populate('editor', 'name').sort({ 'timestamp': -1 });
        return res.status(200).send(operations);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const operation = yield operation_model_1.default.findOne({ _id: id }).populate('vehicles', 'name').populate('editor', 'name');
        return res.status(200).send(operation);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const operation = yield operation_model_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).send(operation);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const operation = yield operation_model_1.default.findById(id);
        yield operation.delete();
        res.status(200).send(operation);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=operation.js.map
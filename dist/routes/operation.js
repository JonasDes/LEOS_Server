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
const axios_1 = __importDefault(require("axios"));
const VehicleHandler_1 = __importDefault(require("../handlers/VehicleHandler"));
const recursive_diff_1 = __importDefault(require("recursive-diff"));
const router = express_1.default.Router();
exports.operationRouter = router;
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let searchString = "";
        for (const [key, value] of Object.entries(req.body.address)) {
            searchString += value + "+";
        }
        let coordinates = yield axios_1.default.get("https://nominatim.openstreetmap.org/search?q=" + encodeURI(searchString) + "&format=json&polygon=1&addressdetails=1");
        req.body.address.postcode = coordinates.data[0].address.postcode;
        req.body.address.street = coordinates.data[0].address.road;
        req.body.address.number = coordinates.data[0].address.house_number;
        req.body.editor = req.headers.user;
        req.body.mission = "602ac22c8bb6c947a06a4106";
        req.body.timestamp = Date.now();
        let oldOP = {
            keyword: "",
            vehicles: "",
            message: "",
            address: {
                street: "",
                number: "",
                object: "",
                postcode: "",
                city: "",
            },
            addressDestination: {
                street: "",
                number: "",
                object: "",
                postcode: "",
                city: "",
            },
            priority: ""
        };
        let newOP = {
            keyword: req.body.keyword,
            address: req.body.address,
            vehicles: req.body.vehicles,
            message: req.body.message,
            addressDestination: req.body.addressDestination,
            priority: req.body.priority
        };
        const delta = recursive_diff_1.default.getDiff(oldOP, newOP);
        let changes = [];
        delta.forEach(element => {
            console.log(element.path[0]);
            if (!(element.path[0] == 'vehicles' && element.op == 'update'))
                changes.push(element);
        });
        req.body.edit = [];
        if (changes.length !== 0) {
            req.body.edit.push({ timestamp: Date.now(), changes });
        }
        const operation = new operation_model_1.default(req.body);
        yield operation.save();
        (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.vehicles) === null || _b === void 0 ? void 0 : _b.forEach((vehicle) => __awaiter(void 0, void 0, void 0, function* () {
            VehicleHandler_1.default.updateVehicle(vehicle, { "lat": coordinates.data[0].lat, "lng": coordinates.data[0].lon }, true);
            console.log(yield VehicleHandler_1.default.setOperation(vehicle, operation._id));
        }));
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
        const operations = yield operation_model_1.default.find().populate('editor', 'name').sort({ 'timestamp': -1 });
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
        const operation = yield operation_model_1.default.findOne({ _id: id }).populate('editor', 'name');
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
        let oldOperation = yield operation_model_1.default.findOne({ _id: id });
        let oldOP = {
            keyword: oldOperation.keyword,
            address: oldOperation.address,
            vehicles: oldOperation.vehicles,
            message: oldOperation.message,
            addressDestination: oldOperation.addressDestination,
            priority: oldOperation.priority
        };
        let newOP = {
            keyword: req.body.keyword,
            address: req.body.address,
            vehicles: req.body.vehicles,
            message: req.body.message,
            addressDestination: req.body.addressDestination,
            priority: req.body.priority
        };
        const delta = recursive_diff_1.default.getDiff(oldOP, newOP);
        let changes = [];
        delta.forEach(element => {
            if (!(element.path[0] == 'vehicles' && element.op == 'update'))
                changes.push(element);
        });
        if (changes.length !== 0) {
            oldOperation.edit.push({ timestamp: Date.now(), changes });
            Object.assign(req.body.edit, oldOperation.edit);
        }
        const operation = yield operation_model_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        index_1.ioServer.io.emit("pull-operation");
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
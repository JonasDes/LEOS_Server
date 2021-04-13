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
exports.missionDiaryRouter = void 0;
const express_1 = __importDefault(require("express"));
const missiondiary_model_1 = __importDefault(require("../models/missiondiary.model"));
const router = express_1.default.Router();
exports.missionDiaryRouter = router;
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.entryId = (yield missiondiary_model_1.default.countDocuments({ mission: req.body.mission })) + 1;
        req.body.editor = req.headers.user;
        req.body.timestamp = Date.now();
        const missionDiary = new missiondiary_model_1.default(req.body);
        yield missionDiary.save();
        res.status(200).send(missionDiary);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.mission) {
            const missionDiary = yield missiondiary_model_1.default.find().populate('mission').populate('editor', `name`).sort({ 'timestamp': -1 });
            return res.status(200).send(missionDiary);
        }
        else {
            const missionDiary = yield missiondiary_model_1.default.find({ mission: req.query.mission }).populate('mission').populate('editor', `name`);
            return res.status(200).send(missionDiary);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const missionDiary = yield missiondiary_model_1.default.findOne({ _id: id }).populate('mission').populate('editor', `name`);
        return res.status(200).send(missionDiary);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const missionDiary = yield missiondiary_model_1.default.findOne({ _id: id });
        missionDiary.edit.push({ timestamp: missionDiary === null || missionDiary === void 0 ? void 0 : missionDiary.timestamp, data: { content: missionDiary === null || missionDiary === void 0 ? void 0 : missionDiary.content, comment: missionDiary === null || missionDiary === void 0 ? void 0 : missionDiary.comment } });
        missionDiary.timestamp = Date.now();
        missionDiary.content = req.body.content || missionDiary.content;
        missionDiary.comment = req.body.comment || missionDiary.comment;
        const missionDiaryNew = yield missiondiary_model_1.default.findOneAndUpdate({ _id: id }, missionDiary, { new: true });
        res.status(200).send(missionDiaryNew);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const missionDiaryEntry = yield missiondiary_model_1.default.findById(id);
        yield missionDiaryEntry.delete();
        return res.status(200).send(missionDiaryEntry);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=missionDiary.js.map
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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserHandler_1 = __importDefault(require("../handlers/UserHandler"));
const router = express_1.default.Router();
exports.userRouter = router;
// READ ALL
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserHandler_1.default.getUsers();
        return res.status(200).send(users);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// CURRENT USER
router.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send({ user: req.headers.user });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield UserHandler_1.default.getById(id);
        return res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserHandler_1.default.createUser(req.body);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// UPDATE
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield UserHandler_1.default.updateUser(id, req.body);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield UserHandler_1.default.deleteUser(id);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=user.js.map
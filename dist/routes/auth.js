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
exports.checkAuth = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.default.Router();
exports.authRouter = router;
// LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = yield user_model_1.default.findOne({ name: username });
            if ((user === null || user === void 0 ? void 0 : user.password) === password) {
                const token = jsonwebtoken_1.default.sign({ accesskey: user.accesskey }, "123456", { expiresIn: '1d' });
                res.status(200).send({ "token": token });
            }
            else {
                res.status(401).send({ "success": false, "error": "Unauthorized" });
            }
        }
        else
            res.status(401).send({ "success": false, "error": "No Data provided" });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}));
// LOGOUT
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ "success": true });
}));
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearerHeader = req.headers.authorization;
        if (bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            try {
                const jwtoken = yield jsonwebtoken_1.default.verify(token.toString(), "123456");
                const user = yield user_model_1.default.findOne({ accesskey: jwtoken.accesskey }).select('name').populate('role');
                if (jwtoken && user) {
                    req.headers.user = user;
                    next();
                }
                else
                    res.status(403).send({ "success": false, "error": "Forbidden" });
            }
            catch (e) {
                res.status(500).send(e.message);
            }
        }
        else
            return res.status(401).send({ "success": false, "error": "Unauthorized" });
    });
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.js.map
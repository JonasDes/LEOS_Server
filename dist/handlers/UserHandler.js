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
const user_model_1 = __importDefault(require("../models/user.model"));
const userHandler = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return user_model_1.default.find().populate('role').select('name');
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        userData.accesskey = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36).substring(2, 15)).toUpperCase();
        const user = new user_model_1.default(userData);
        return user.save();
    }),
    getById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return user_model_1.default.findOne({ _id: id });
    }),
    deleteUser: (userID) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(userID);
        return user.delete();
    }),
    updateUser: (vehicleID, vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
        return user_model_1.default.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true });
    })
};
exports.default = userHandler;
//# sourceMappingURL=UserHandler.js.map
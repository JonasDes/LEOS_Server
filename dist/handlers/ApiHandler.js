"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const station_1 = require("../routes/station");
const vehicle_1 = require("../routes/vehicle");
const vehicleType_1 = require("../routes/vehicleType");
const userRole_1 = require("../routes/userRole");
const user_1 = require("../routes/user");
const keyword_1 = require("../routes/keyword");
const mission_1 = require("../routes/mission");
const missionDiary_1 = require("../routes/missionDiary");
const operation_1 = require("../routes/operation");
const divera_1 = require("../routes/divera");
const tent_1 = require("../routes/tent");
const patient_1 = require("../routes/patient");
const auth_1 = require("../routes/auth");
const router = express_1.default.Router();
exports.apiRouter = router;
/*****************
* ROUTES W/ AUTH *
******************/
router.use('/auth', auth_1.authRouter);
router.use('/', auth_1.checkAuth);
/*****************
* ROUTES W AUTH *
******************/
router.use('/station', station_1.stationRouter);
router.use('/vehicle', vehicle_1.vehicleRouter);
router.use('/vehicleType', vehicleType_1.vehicleTypeRouter);
router.use('/userRole', userRole_1.userRoleRouter);
router.use('/user', user_1.userRouter);
router.use('/keyword', keyword_1.keywordRouter),
    router.use('/mission', mission_1.missionRouter);
router.use('/missionDiary', missionDiary_1.missionDiaryRouter);
router.use('/operation', operation_1.operationRouter);
router.use('/divera', divera_1.diveraRouter);
router.use('/tent', tent_1.tentRouter);
router.use('/patient', patient_1.patientRouter);
//# sourceMappingURL=ApiHandler.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diveraHandler = exports.ioServer = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const Divera_1 = __importDefault(require("./handlers/Divera"));
const ApiHandler_1 = require("./handlers/ApiHandler");
const cors_1 = __importDefault(require("cors"));
const SocketHandler_1 = __importDefault(require("./handlers/SocketHandler"));
const AlarmPDF_1 = __importDefault(require("./handlers/AlarmPDF"));
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
const http = require("http").Server(app);
const ioServer = new SocketHandler_1.default(http);
exports.ioServer = ioServer;
const diveraHandler = new Divera_1.default('Me21Yl8jhfJie1-oakPzr9wG585yT_IfkrwRKubHX_MciKWACRdgzK11H7dJI4Ur');
exports.diveraHandler = diveraHandler;
// new EtbPDF("602ac22c8bb6c947a06a4106")
new AlarmPDF_1.default("606ba8c98f4aed2298dfcfb0");
const server = http.listen(3000, () => {
    console.log("listening on *:3000");
});
app.use(cookie_parser_1.default());
app.use(body_parser_1.json());
app.use(cors_1.default());
app.use('/api', ApiHandler_1.apiRouter);
mongoose_1.default.connect('mongodb://localhost:27017/mylst', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("MongoDB database connected");
    // console.log("Setting change streams");
    // const thoughtChangeStream = connection.collection('vehicles').watch()
    //
    // thoughtChangeStream.on("change", (change) => {
    //     console.log("TEST")
    //     console.log(change)
    //
    // });
});
//# sourceMappingURL=index.js.map
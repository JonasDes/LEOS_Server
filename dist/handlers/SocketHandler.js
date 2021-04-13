"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketHandler {
    constructor(http) {
        this.io = require("socket.io")(http);
        this.io.on("connection", (socket) => {
            console.log("a user connected");
        });
    }
}
exports.default = SocketHandler;
//# sourceMappingURL=SocketHandler.js.map
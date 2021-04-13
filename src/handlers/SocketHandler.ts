import SocketIO from "socket.io";


class SocketHandler {
    public io: SocketIO.Server
    constructor(http: any) {
        this.io = require("socket.io")(http);
        this.io.on("connection", (socket: any) => {
            console.log("a user connected");
        })
    }
}


export default SocketHandler

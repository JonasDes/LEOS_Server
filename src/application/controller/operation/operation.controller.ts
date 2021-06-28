import { SocketService } from "../../socket";
import { LoggerService } from "../../../infrastructure";
import { Operation, OperationSchema } from ".";
import dateformat from 'dateformat'
import { isValidObjectId } from "mongoose";

export class OperationController {
    constructor(
        protected socket: SocketService,
        protected logger: LoggerService
    ) {

    }

    async createOperation(operation: OperationSchema) {
        try {
            operation.timestamp = Date.now()
            const count: string = await Operation.countDocuments({ mission: operation.mission }) + 1
            operation.entryId = dateformat(Date.now(), "yyyy-mm-dd") + "-" + count
            return new Operation(operation).save()
            this.socket.sendPullOperation()
        } catch (error) {
            return error
        }
    }
}
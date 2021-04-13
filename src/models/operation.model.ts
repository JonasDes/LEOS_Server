import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {UserRoleSchema} from "./userrole.model";
import {VehicleSchema} from "./vehicle.model";
import {UserSchema} from "./user.model";
import {MissionSchema} from "./mission.model";

class Operation {
    @prop({ref: () => VehicleSchema, required:true})
    public vehicles: Ref <VehicleSchema>[]

    @prop({ref: () => UserSchema, required:true})
    public editor: Ref <UserSchema>

    @prop({ref: () => MissionSchema, required:true})
    public mission: Ref <MissionSchema>

    @prop({required: true})
    public address: object

    @prop()
    public addressDestination: object

    @prop()
    public timestamp: string

    @prop()
    public keyword: string

    @prop()
    public message: string
}


export { Operation as OperationSchema }
export default getModelForClass(Operation)
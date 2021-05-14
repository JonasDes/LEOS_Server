import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { VehicleSchema } from "./vehicle.model";
import { UserSchema } from "./user.model";
import { MissionSchema } from "./mission.model";

interface Address {
    object: string,
    street: string,
    number: string,
    postcode: string,
    city: string,
}

class Operation {
    @prop({ ref: () => VehicleSchema })
    public vehicles: Ref<VehicleSchema>[]

    @prop({ ref: () => UserSchema, required: true })
    public editor: Ref<UserSchema>

    @prop({ ref: () => MissionSchema, required: true })
    public mission: Ref<MissionSchema>

    @prop({ required: true })
    public entryId: number

    @prop({
        default: {
            object: "",
            street: "",
            number: "",
            postcode: "",
            city: "",
        },
        required: true
    })
    public address: Address

    @prop({
        default: {
            street: "",
            number: "",
            object: "",
            postcode: "",
            city: "",
        }
    })
    public addressDestination: Address

    @prop({ default: Date.now() })
    public timestamp: number

    @prop()
    public priority: boolean

    @prop()
    public keyword: string

    @prop()
    public message: string

    @prop()
    public edit: object[]
}


export { Operation as OperationSchema }
export default getModelForClass(Operation)
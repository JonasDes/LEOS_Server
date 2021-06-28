import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { MissionSchema } from "../mission";
import { UserSchema } from "../user";
import { VehicleSchema } from "../vehicle";


interface Address {
    object: string,
    street: string,
    number: string,
    postcode: string,
    city: string,
}

class Operation {

    @prop({ ref: VehicleSchema })
    public vehicles: Ref<VehicleSchema>[]


    @prop({ ref: UserSchema, required: true })
    public editor: Ref<UserSchema>

    @prop({ ref: MissionSchema, required: true })
    public mission: Ref<MissionSchema>

    @prop({ required: true })
    public entryId: string

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

const model = getModelForClass(Operation)

export { Operation as OperationSchema, model as Operation }

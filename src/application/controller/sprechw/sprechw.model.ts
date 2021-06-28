import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { VehicleSchema } from "../";

class SprechW {

    @prop({ required: true })
    public timestamp: number

    @prop({ ref: () => VehicleSchema, autopopulate: true })
    public vehicle: Ref<VehicleSchema> | string

}

const model = getModelForClass(SprechW)

export { SprechW as SprechWSchema, model as SprechW }
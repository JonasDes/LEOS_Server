import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { VehicleSchema } from "./vehicle.model";

class SprechW {

    @prop({ required: true })
    public timestamp: number

    @prop({ ref: () => VehicleSchema, autopopulate: true })
    public vehicle: Ref<VehicleSchema> | string

}

export { SprechW as SprechWSchema }
export default getModelForClass(SprechW)
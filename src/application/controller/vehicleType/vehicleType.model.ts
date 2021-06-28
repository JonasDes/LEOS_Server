import { getModelForClass, prop } from "@typegoose/typegoose";

class VehicleType {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public nameLong: string
}

const model = getModelForClass(VehicleType)

export { VehicleType as VehicleTypeSchema, model as VehicleType }

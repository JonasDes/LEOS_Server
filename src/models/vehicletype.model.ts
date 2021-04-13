import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {StationSchema} from "./station.model"

class VehicleType {
    @prop({required:true})
    public name: string

    @prop({required:true})
    public nameLong: string
}


export { VehicleType as VehicleTypeSchema }
export default getModelForClass(VehicleType)
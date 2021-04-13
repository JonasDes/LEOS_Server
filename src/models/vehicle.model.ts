import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { StationSchema } from "./station.model"
import { VehicleTypeSchema } from "./vehicletype.model";

class Vehicle {
    @prop({ required: true })
    public name: string

    @prop()
    public divera_id: string

    @prop({ default: '2' })
    public fms: string

    @prop({ default: '51.000000' })
    public lat: string

    @prop({ default: '6.000000' })
    public lng: string

    @prop({ ref: () => StationSchema, autopopulate: true })
    public station: Ref<StationSchema>

    @prop({ ref: () => VehicleTypeSchema, autopopulate: true })
    public type: Ref<VehicleTypeSchema>
}


export { Vehicle as VehicleSchema }
export default getModelForClass(Vehicle)
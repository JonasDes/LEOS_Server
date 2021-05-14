import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { StationSchema } from "./station.model"
import { VehicleTypeSchema } from "./vehicletype.model";
import { OperationSchema } from "./operation.model";


class Vehicle {
    // @prop({ required: true })
    // public _id: ObjectId

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

    @prop()
    public keyplate: string

    @prop()
    public phone: number

    @prop({ ref: () => StationSchema, autopopulate: true })
    public station: Ref<StationSchema>

    @prop({ ref: () => VehicleTypeSchema, autopopulate: true })
    public type: Ref<VehicleTypeSchema>

    @prop({ ref: 'Operation', type: mongoose.Schema.Types.ObjectId }) // @TODO: https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes/#common-problems
    public operation: Ref<OperationSchema>


}



export { Vehicle as VehicleSchema }
export default getModelForClass(Vehicle)
import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {VehicleTypeSchema} from "./vehicletype.model";

class Keyword {
    @prop({required:true})
    public name: string

    @prop({required:true})
    private nameLong: string

    @prop({required:true})
    public priority: boolean

    @prop({ref: () => VehicleTypeSchema})
    public vehicles: Ref <VehicleTypeSchema>[]
}


export { Keyword as KeywordSchema }
export default getModelForClass(Keyword)
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { VehicleTypeSchema } from "../";

class Keyword {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    private nameLong: string

    @prop({ required: true })
    public priority: boolean

    @prop({ ref: () => VehicleTypeSchema })
    public vehicles: Ref<VehicleTypeSchema>[]
}

const model = getModelForClass(Keyword)

export { Keyword as KeywordSchema, model as Keyword }
